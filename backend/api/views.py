from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken
from api.models import APIKeyProvider
from api.serializers import APIKeyProviderSerializer
from rest_framework.renderers import JSONRenderer
import requests
import base64

class CredentialDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, type):
        if type not in ['google', 'facebook', 'octranspo', 'weather', 'openweathermap']:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        context = {}

        if type not in ['google', 'facebook']:
            context['token'] = {}
            data = APIKeyProviderSerializer(APIKeyProvider.objects.filter(name=type).first()).data
            if 'api_key' in data:
                context['token'] = data['api_key']
            if 'api_id' in data and data['api_id'] != '':
                context['app_id'] = data['api_id']
        else:
            provider_uid = SocialAccount.objects.filter(user_id=request.user.id, provider=type)
            if provider_uid.exists():
                provider_uid = provider_uid[0].uid
                context['token'] = str(SocialToken.objects.filter(account__user=request.user, account__provider=type).first().token)
            else:
                return JsonResponse(status=404, data={'detail':'User not registered with provider'})
        return JsonResponse(data=context, status=200)

GOOGLE_REFRESH_URL='https://www.googleapis.com/oauth2/v4/token'
class CredentialRefresh(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, type):
        if type not in ['google']:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        context = {}

        provider_uid = SocialAccount.objects.filter(user_id=request.user.id, provider=type)
        if provider_uid.exists():
            provider_uid = provider_uid[0].uid
            token_obj = SocialToken.objects.filter(account__user=request.user, account__provider=type).first()
            socialapp = SocialApp.objects.filter(provider=type).first()
            res = requests.post(GOOGLE_REFRESH_URL, data={
                'client_id': socialapp.client_id,
                'client_secret': socialapp.secret,
                'refresh_token': token_obj.token_secret,
                'grant_type': 'refresh_token'
            })

            if res.status_code is not 200:
                return JsonResponse(status=res.status_code, data={'detail': res.text})
            res_data = res.json()
            token_obj.token = res_data['access_token']
            context['token'] = token_obj.token
            token_obj.save()

        else:
            return JsonResponse(status=404, data={'detail':'User not registered with provider'})
        return JsonResponse(data=context, status=200)


OCTRANSPO_GET_BASE_URL='https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?format=json&appID={}&apiKey={}&stopNo={}'

TWITTER_GET_TOKEN_URL = 'https://api.twitter.com/oauth2/token?grant_type=client_credentials'
TWITTER_GET_TWEERTS_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={}&count={}'
class ServiceRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, type):
        context = {}
        if type == 'octranspo':
            try:
                stop_num = int(request.GET['stop'])
            except ValueError:
                return JsonResponse(status=400, data={'detail':'Invalid type for stop_num'})

            provider = APIKeyProviderSerializer(APIKeyProvider.objects.filter(name=type).first()).data

            res = requests.get(OCTRANSPO_GET_BASE_URL.format(provider['api_id'],provider['api_key'], stop_num))

            if res.status_code is not 200:
                return JsonResponse(status=res.status_code, data={'detail': res.text})
            context = res.json()
        elif type == 'twitter':
            try:
                screen_name = str(request.GET['screen_name'])
            except ValueError:
                return JsonResponse(status=400, data={'detail':'Invalid type for screen_name'})

            try:
                count = int(request.GET['count'])
            except ValueError:
                return JsonResponse(status=400, data={'detail':'Invalid type for count'})


            provider_uid = SocialAccount.objects.filter(user_id=request.user.id, provider=type)
            if not provider_uid.exists():
                return JsonResponse(status=404, data={'detail':'User not registered with provider'})
            twitter_app = SocialApp.objects.filter(provider=type).first()
            # Using Application-only Authentication (https://developer.twitter.com/en/docs/basics/authentication/overview/application-only.html)
            basic_token = base64.b64encode((twitter_app.client_id + ':' + twitter_app.secret).encode()).decode('utf-8')
            res = requests.post(TWITTER_GET_TOKEN_URL, headers= {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Basic {}'.format(basic_token)
            })
            if res.status_code is not 200:
                return JsonResponse(status=res.status_code, data={'detail': res.text})
            bearer_token = res.json()['access_token']
            res = requests.get(TWITTER_GET_TWEERTS_URL.format(screen_name, count), headers= {
                'Authorization': 'Bearer {}'.format(bearer_token)
            })
            if res.status_code is not 200:
                return JsonResponse(status=res.status_code, data={'detail': res.text})
            context['data'] = res.json()
        else:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})
        return JsonResponse(status=200, data=context)