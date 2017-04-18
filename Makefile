install:
	npm install

test:
	npm test

run:
	npm start $(username) $(user_name)

deploy:
	./infrastructure/deploy.sh

.PHONY: install test build deploy
