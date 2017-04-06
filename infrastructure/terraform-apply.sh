#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd infrastructure

terraform get
terraform apply \
  -var pragmathanks_get_balance_s3_bucket=${PRAGMATHANKS_S3_BUCKET} \

cd $root_dir
