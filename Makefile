install:
	npm install

test:
	npm test

run:
	npm start $(username) $(user_name)

deploy:
	$(MAKE) install
	./infrastructure/deploy.sh

.PHONY: install test build deploy
