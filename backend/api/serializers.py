from rest_framework import serializers
from api.models import APIKeyProvider, ServiceConfig


class APIKeyProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKeyProvider
        fields = ('name', 'api_id', 'api_key')


class ServiceConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceConfig
        fields = ('config')