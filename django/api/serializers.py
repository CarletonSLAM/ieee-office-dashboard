from rest_framework import serializers
from api.models import APIKeyProvider


class APIKeyProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKeyProvider
        fields = ('name', 'api_id', 'api_key')