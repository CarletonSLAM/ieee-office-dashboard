from django.http import JsonResponse
from rest_framework.views import APIView
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.models import SocialToken
import requests

class CredentialDetail(APIView):
    def get(self, request, type):
        if type not in ['google', 'facebook']:
            return JsonResponse(status=400, data={'detail':'Unknown provider'})

        context = {}
        provider_uid = SocialAccount.objects.filter(user_id=request.user.id, provider=type)
        if provider_uid.exists():
            provider_uid = provider_uid[0].uid
            context['token'] = SocialToken.objects.filter(account__user=request.user, account__provider=type).first()
        else:
            return JsonResponse(status=404, data={'detail':'User not registered with provider'})
        return JsonResponse(data={ 'token': str(context['token']) }, status=200)