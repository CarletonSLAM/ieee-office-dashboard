from django.urls import resolve
from django.test import TestCase
from pages.urls import home_redirect  
from pages.views import PrivacyPageView, DashboardConfigView, catchall

class HomePageTest(TestCase):

    def test_url_root(self):
        found = resolve('/')  
        self.assertEqual(found.view_name, 'home')

    def test_url_privacy(self):
        found = resolve('/privacy/')  
        self.assertEqual(found.view_name, 'privacy')

    def test_url_config(self):
        found = resolve('/config/')  
        self.assertEqual(found.view_name, 'config')

    def test_url_dash(self):
        found = resolve('/dash/')  
        self.assertEqual(found.view_name, 'dash')