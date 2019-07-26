from django.urls import path, re_path

from allauth.account.views import LoginView
from . import views

def home_redirect(request):
    if request.user.is_authenticated:
        return LoginView.as_view()(request)
    else:
        return views.HomePageView.as_view()(request)


urlpatterns = [
    path('', home_redirect, name='home'),
    path('privacy/', views.PrivacyPageView.as_view(), name='privacy'),
    path('config/', views.DashboardConfigView.as_view(), name='dash-config'),
    path('dash/', views.catchall, name='dash'),
]
