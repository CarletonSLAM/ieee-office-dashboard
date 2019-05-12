from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.models import SocialToken
from api.models import APIKeyProvider
from api.serializers import APIKeyProviderSerializer
from rest_framework.renderers import JSONRenderer
import requests

class CredentialDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, type):
        if type not in ['google', 'facebook', 'octranspo', 'weather', 'openweathermap']:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        context = {}

        if type not in ['google', 'facebook']:
            context['token'] = {}
            data = APIKeyProviderSerializer(APIKeyProvider.objects.filter(name=type).first()).data
            print(data)
            if 'api_key' in data:
                context['token'] = data['api_key']
            if 'api_id' in data and data['api_id'] != '':
                context['app_id'] = data['api_id']
        else:
            provider_uid = SocialAccount.objects.filter(user_id=request.user.id, provider=type)
            if provider_uid.exists():
                provider_uid = provider_uid[0].uid
                context['token'] = str(SocialToken.objects.filter(account__user=request.user, account__provider=type).first())
            else:
                return JsonResponse(status=404, data={'detail':'User not registered with provider'})
        return JsonResponse(data=context, status=200)


OCTRANSPO_GET_BASE_URL='https://api.octranspo1.com/v1.2/GetNextTripsForStopAllRoutes?format=json&appID={}&apiKey={}&stopNo={}'

class ServiceRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, type):
        if type is not 'octranspo':
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        provider = APIKeyProviderSerializer(APIKeyProvider.objects.filter(name=type).first()).data
        stop_nums = request.GET['stops']
        res = requests.get(OCTRANSPO_GET_BASE_URL.format(provider['api_id'],provider['api_key'], stop_nums))

        context = res.json()
        if res.status_code is not 200:
            return JsonResponse(status=res.status_code, data={'detail': res.text})

        return JsonResponse(status=200, data=context)