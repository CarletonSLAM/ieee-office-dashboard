from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views
from api import views


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('credentials/<str:type>/', views.CredentialDetail.as_view()),
    path('credentials/<str:type>/refresh/', views.CredentialRefresh.as_view()),
    path('services/<str:type>/', views.ServiceRequest.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]