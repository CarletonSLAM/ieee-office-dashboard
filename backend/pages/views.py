from django.views.generic import TemplateView

class HomePageView(TemplateView):
    template_name = 'base.html'


catchall = TemplateView.as_view(template_name='index.html')