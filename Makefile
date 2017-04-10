install:
	npm install

test:
	npm test

run:
	npm start $(username) $(user_name)

build:
	rm -f pragmathanks_get_balance_lambda.zip
	zip pragmathanks_get_balance_lambda.zip index.js src/**

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
