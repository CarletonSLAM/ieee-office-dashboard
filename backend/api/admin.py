from django.contrib import admin

from api.models import APIKeyProvider

class APIKeyProviderAdmin(admin.ModelAdmin):
    list_display = ('name', )


admin.site.register(APIKeyProvider, APIKeyProviderAdmin)