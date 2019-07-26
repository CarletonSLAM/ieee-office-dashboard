from django.views.generic import TemplateView
from api.models import ServiceConfig
from api.serializers import ServiceConfigSerializer
from django.views import View
from django.shortcuts import render
from pages.forms import ConfigForm
import json

class HomePageView(TemplateView):
    template_name = 'home.html'


class PrivacyPageView(TemplateView):
    template_name = 'privacy.html'


class DashboardConfigView(View):
    form_class = ConfigForm
    template_name = 'config.html'

    def get(self, request, *args, **kwargs):
        config = '[]'
        configObj = ServiceConfig.objects.filter(owner=self.request.user)
        if configObj.exists():
            config = configObj.first().config
        return render(request, self.template_name, context={'config': config})


    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            config = json.dumps(json.loads(form.cleaned_data['config']), separators=(',', ':'))
            service_config = ServiceConfig.objects.filter(owner=self.request.user)
            if service_config.exists():
                service_config.update(config=config)
            else:
                service_config = ServiceConfig(owner=self.request.user, config=config)
                service_config.save()

        return render(request, self.template_name, context={'config': ServiceConfig.objects.filter(owner=self.request.user).first().config})




catchall = TemplateView.as_view(template_name='index.html')