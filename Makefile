install:
	npm install

test:
	$(MAKE) install
	npm test

run:
	$(MAKE) install
	npm start $(username) $(user_name)

build:
	rm -f pragmathanks_get_balance_lambda.zip
	rm -rf node_modules
	npm install --only=production
	zip -r pragmathanks_get_balance_lambda.zip index.js src node_modules

deploy:
	./infrastructure/deploy.sh

.PHONY: install test build deploy
