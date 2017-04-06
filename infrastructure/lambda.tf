variable "pragmathanks_get_balance_s3_bucket" {}

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
}
