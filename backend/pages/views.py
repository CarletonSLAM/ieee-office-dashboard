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
        config = '[{"h":0.84,"w":1,"layout":[{"w":0.33,"h":1,"layout":[{"w":1,"h":0.5,"tile":{"name":"instagram","config":{"timeout":"1H","account":"ieeeorg","count":10}}},{"w":1,"h":0.5,"tile":{"name":"twitter","config":{"timeout":"15M","account":"ieeecu","count":10}}}]},{"w":0.33,"h":1,"layout":[{"w":1,"h":0.4,"tile":{"name":"info"}},{"w":1,"h":0.6,"tile":{"name":"gallery","config":{"timeout":"4H","folderID":"1aWcL4Wc7lOQuSI1-fZ2gX49__n0uwpuX"}}}]},{"w":0.33,"h":1,"tile":{"name":"calendar","config":{"timeout":"30M","calID":"ieee.carleton.ca_0oehshcagcul0e8pe5e9fie70s@group.calendar.google.com"}}}]},{"h":0.16,"w":1,"layout":[{"w":0.5,"h":1,"tile":{"name":"transpo","config":{"timeout":"5M","stops":["5813"]}}},{"w":0.5,"h":1,"tile":{"name":"openweathermap","config":{"timeout":"1H","location":"Ottawa,ca","units":"metric"}}}]}]'
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