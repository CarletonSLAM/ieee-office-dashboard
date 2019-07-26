from django.contrib import admin

from api.models import APIKeyProvider, ServiceConfig

class APIKeyProviderAdmin(admin.ModelAdmin):
    list_display = ('name', )


class ServiceConfigAdmin(admin.ModelAdmin):
    list_display = ('owner', )

admin.site.register(APIKeyProvider, APIKeyProviderAdmin)

admin.site.register(ServiceConfig, ServiceConfigAdmin)