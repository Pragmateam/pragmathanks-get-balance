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
  description = "Get your PragmaThanks balance."
  role = "${aws_iam_role.iam_for_pragmathanks_get_balance_lambda.arn}"
  handler = "index.handler"
  runtime = "nodejs6.10"

  environment {
    variables = {
      GOOGLE_CLIENT_ID = "${var.google_client_id}"
      GOOGLE_CLIENT_SECRET = "${var.google_client_secret}"
      GOOGLE_PROJECT_ID = "${var.google_project_id}"
      GOOGLE_AUTH_URI = "${var.google_auth_uri}"
      GOOGLE_TOKEN_URI = "${var.google_token_uri}"
      GOOGLE_AUTH_PROVIDER_CERT_URL = "${var.google_auth_provider_cert_url}"
      GOOGLE_REDIRECT_URIS_FIRST = "${var.google_redirect_uris_first}"
      GOOGLE_REDIRECT_URIS_LAST = "${var.google_redirect_uris_last}"
      GOOGLE_ACCESS_TOKEN = "${var.google_access_token}"
      GOOGLE_REFRESH_TOKEN = "${var.google_refresh_token}"
      GOOGLE_TOKEN_EXPIRY_DATE = "${var.google_token_expiry_date}"
      SPREADSHEET_ID = "${var.spreadsheet_id}"
    }
  }
}
