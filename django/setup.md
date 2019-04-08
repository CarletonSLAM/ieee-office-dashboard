1. Run the following commands first
    python3 -m venv env
    source  env/bin/activate
2. Install django puglins
    pip3 install django djangorestframework
    django-admin startproject <PROJECT_NAME>
    cd <PROJECT_NAME> && python3 manage.py startapp <APP_NAME>
3. Pull env dependencies
    pip3 install -r requirements.txt

# Guides
REST enpoints guide: https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
Allauth templates: https://github.com/pennersr/django-allauth/tree/master/allauth/templates