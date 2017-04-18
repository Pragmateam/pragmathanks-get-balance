#!/usr/bin/env bash

node infrastructure/claudiaJsonCreator.js
./node_modules/.bin/claudia update --config claudia.json

# First time deploy
#./node_modules/.bin/claudia create \
#  --region ${AWS_REGION} \
#  --api-module index \
#  --name ${FUNCTION_NAME} \
#  --set-env GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID},GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET},GOOGLE_PROJECT_ID=${GOOGLE_PROJECT_ID},GOOGLE_AUTH_URI=${GOOGLE_AUTH_URI},GOOGLE_TOKEN_URI=${GOOGLE_TOKEN_URI},GOOGLE_AUTH_PROVIDER_CERT_URL=${GOOGLE_AUTH_PROVIDER_CERT_URL},GOOGLE_REDIRECT_URIS_FIRST=${GOOGLE_REDIRECT_URIS_FIRST},GOOGLE_REDIRECT_URIS_LAST=${GOOGLE_REDIRECT_URIS_LAST},GOOGLE_ACCESS_TOKEN=${GOOGLE_ACCESS_TOKEN},GOOGLE_REFRESH_TOKEN=${GOOGLE_REFRESH_TOKEN},GOOGLE_TOKEN_EXPIRY_DATE=${GOOGLE_TOKEN_EXPIRY_DATE},SPREADSHEET_ID=${SPREADSHEET_ID}
