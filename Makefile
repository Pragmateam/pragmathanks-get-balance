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
	zip pragmathanks_get_balance_lambda.zip index.js src/** node_modules/**

deploy:
	$(MAKE) build
	$(MAKE) terraform-destroy
	$(MAKE) terraform-apply

terraform-install:
	./infrastructure/terraform-install.sh
	$(MAKE) terraform-init

terraform-init:
	./infrastructure/terraform-init.sh

terraform-apply:
	./infrastructure/terraform-apply.sh

terraform-destroy:
	./infrastructure/terraform-destroy.sh

.PHONY: install test build deploy terraform-install terraform-apply terraform-destroy
