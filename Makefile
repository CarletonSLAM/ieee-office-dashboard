deploy-heroku:
	git checkout dev
	git branch -D deploy-heroku; true
	$(MAKE) -C frontend build-prod
	git checkout -b deploy-heroku
	git add .
	git commit -m "Deploy at $(date +%s)"
	git push -f heroku deploy-heroku:master
	git checkout dev

