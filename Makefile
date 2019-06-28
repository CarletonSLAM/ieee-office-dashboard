deploy-heroku:
	git checkout dev
	git branch -D deploy-heroku; true
	$(MAKE) -C frontend build-prod
	git checkout -b deploy-heroku
	git add .
	git commit -m "Deploy at $$(date +%s)"
	heroku buildpacks:clear
	heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack
	heroku buildpacks:add heroku/python
	heroku config:set PROJECT_PATH=backend
	heroku config:set DJANGO_SECRET_KEY=$$(python3 -c 'from django.core.management import utils; print(utils.get_random_secret_key())')
	heroku config:set DISABLE_COLLECTSTATIC=1
	git push -f heroku deploy-heroku:master
	git checkout dev

