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

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
BACKEND_DIR = os.path.abspath(os.path.join(BASE_DIR, '..'))
FRONTEND_DIR = os.path.abspath(os.path.join(BACKEND_DIR, '..', 'frontend'))
STATICFILES_DIRS = [
    os.path.join(FRONTEND_DIR, 'build', 'static'),
    os.path.join(BACKEND_DIR, 'pages', 'static'),
]
STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')
STATIC_ROOT = os.path.join(BACKEND_DIR, 'static')
STATIC_URL = '/static/'  # already declared in the default settings
WHITENOISE_ROOT = os.path.join(FRONTEND_DIR, 'build')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BACKEND_DIR, 'pages/templates'),
            os.path.join(FRONTEND_DIR, 'build')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]