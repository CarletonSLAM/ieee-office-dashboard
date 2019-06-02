install:
	scripts/install.sh

run-dev:
	python3 manage.py migrate --settings=dashyserver.settings.dev
	python3 manage.py runserver --settings=dashyserver.settings.dev 0.0.0.0:8000
