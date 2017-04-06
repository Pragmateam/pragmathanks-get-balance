#!/usr/bin/env bash

set -e

root_dir=`pwd`;

cd infrastructure

terraform get
terraform destroy \
  -var pragmathanks_get_balance_s3_bucket=${PRAGMATHANKS_S3_BUCKET} \
  -force

cd $root_dir
