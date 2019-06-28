deploy-heroku:
	git checkout -D deploy-heroku
	$(MAKE) -C build
	cp -r frontend/build backend/frontend
	git checkout -b deploy-heroku
	git add .
	git commit -m "Deploy at $(date +%s)"
	git push -f heroku deploy-heroku:master
	git checkout dev

