#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd infrastructure

terraform get
terraform apply \
  -var pragmathanks_get_balance_s3_bucket=${PRAGMATHANKS_S3_BUCKET} \
  -var google_client_id=${GOOGLE_CLIENT_ID} \
  -var google_client_secret=${GOOGLE_CLIENT_SECRET} \
  -var google_project_id=${GOOGLE_PROJECT_ID} \
  -var google_auth_uri=${GOOGLE_AUTH_URI} \
  -var google_token_uri=${GOOGLE_TOKEN_URI} \
  -var google_auth_provider_cert_url=${GOOGLE_AUTH_PROVIDER_CERT_URL} \
  -var google_redirect_uris_first=${GOOGLE_REDIRECT_URIS_FIRST} \
  -var google_redirect_uris_last=${GOOGLE_REDIRECT_URIS_LAST} \
  -var spreadsheet_id=${SPREADSHEET_ID}

cd $root_dir
