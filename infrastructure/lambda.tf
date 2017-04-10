variable "pragmathanks_get_balance_s3_bucket" {}
variable "google_client_id" {}
variable "google_client_secret" {}
variable "google_project_id" {}
variable "google_auth_uri" {}
variable "google_token_uri" {}
variable "google_auth_provider_cert_url" {}
variable "google_redirect_uris_first" {}
variable "google_redirect_uris_last" {}
variable "google_access_token" {}
variable "google_refresh_token" {}
variable "google_token_expiry_date" {}
variable "spreadsheet_id" {}

resource "aws_iam_role" "iam_for_pragmathanks_get_balance_lambda" {
  name = "iam_for_pragmathanks_get_balance_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "pragmathanks_get_balance_role_policy" {
  name = "pragmathanks_get_balance_role_policy"
  role = "${aws_iam_role.iam_for_pragmathanks_get_balance_lambda.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "logs:CreateLogGroup",
      "Resource": "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${aws_lambda_function.pragmathanks_get_balance_lambda.function_name}:*"
      ]
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "lambdas_bucket" {
  bucket = "${var.pragmathanks_get_balance_s3_bucket}-lambdas"
  acl = "private"
}

resource "aws_s3_bucket_object" "pragmathanks_get_balance_object" {
  bucket = "${aws_s3_bucket.lambdas_bucket.bucket}"
  key = "pragmathanks_get_balance_lambda"
  source = "../pragmathanks_get_balance_lambda.zip"
  etag = "${md5(file("../pragmathanks_get_balance_lambda.zip"))}"
}

resource "aws_lambda_function" "pragmathanks_get_balance_lambda" {
  function_name = "pragmathanks_get_balance"
  s3_bucket = "${aws_s3_bucket_object.pragmathanks_get_balance_object.bucket}"
  s3_key = "${aws_s3_bucket_object.pragmathanks_get_balance_object.key}"
  description = "Get your pragmathanks balance."
  role = "${aws_iam_role.iam_for_pragmathanks_get_balance_lambda.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"

  environment {
    variables = {
      google_client_id = "${var.google_client_id}"
      google_client_secret = "${var.google_client_secret}"
      google_project_id="${var.google_project_id}"
      google_auth_uri="${var.google_auth_uri}"
      google_token_uri="${var.google_token_uri}"
      google_auth_provider_cert_url="${var.google_auth_provider_cert_url}"
      google_redirect_uris_first="${var.google_redirect_uris_first}"
      google_redirect_uris_last="${var.google_redirect_uris_last}"
      google_access_token="${var.google_access_token}"
      google_refresh_token="${var.google_refresh_token}"
      google_token_expiry_date="${var.google_token_expiry_date}"
      spreadsheet_id="${var.spreadsheet_id}"
    }
  }
}
