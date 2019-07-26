from django.db import models


class APIKeyProvider(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    api_key = models.TextField()
    api_id = models.TextField(blank=True)

    class Meta:
        ordering = ('created',)


class ServiceConfig(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.OneToOneField('auth.User', on_delete=models.CASCADE, unique=True)
    config = models.TextField()

    class Meta:
        ordering = ('created',)
