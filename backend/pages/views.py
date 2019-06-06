from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'home.html'


class PrivacyPageView(TemplateView):
    template_name = 'privacy.html'


catchall = TemplateView.as_view(template_name='index.html')