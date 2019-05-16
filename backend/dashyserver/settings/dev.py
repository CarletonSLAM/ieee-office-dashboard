from .common import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'f-#9=y0yf*&l5w5im@5+-n2l%o6h**1(o(usc=zg)(w#a+v%i0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, '..', 'db.sqlite3'),
    }
}
