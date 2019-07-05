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
        if type not in ['google', 'facebook', 'octranspo', 'weather', 'openweathermap', 'twitter']:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        context = {}

        if type not in ['google', 'facebook', 'twitter']:
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
                if type == 'twitter':
                    twitter_app = SocialApp.objects.filter(provider=type).first()
                    context['token'] = base64.b64encode((twitter_app.client_id + ':' + twitter_app.secret).encode()).decode('utf-8')
                else:
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

class ServiceRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, type):

        if type != 'octranspo':
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        provider = APIKeyProviderSerializer(APIKeyProvider.objects.filter(name=type).first()).data
        stop_num = request.GET['stop']
        res = requests.get(OCTRANSPO_GET_BASE_URL.format(provider['api_id'],provider['api_key'], stop_num))

        context = res.json()
        if res.status_code is not 200:
            return JsonResponse(status=res.status_code, data={'detail': res.text})

        return JsonResponse(status=200, data=context)