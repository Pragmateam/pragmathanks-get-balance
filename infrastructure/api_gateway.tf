resource "aws_api_gateway_rest_api" "pragmathanks_get_balance_api" {
  name = "pragmathanks_get_balance"
  description = "Created by terraform at ${timestamp()}"
}

resource "aws_api_gateway_resource" "pragmathanks_get_balance_api_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  parent_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.root_resource_id}"
  path_part = "balance"
}

resource "aws_api_gateway_method" "pragmathanks_get_balance_api_method" {
  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  resource_id = "${aws_api_gateway_resource.pragmathanks_get_balance_api_resource.id}"
  http_method = "GET"
  authorization = "NONE"

  request_parameters = { "method.request.querystring.username" = true }
}

resource "aws_api_gateway_integration" "pragmathanks_get_balance_api_integration" {
  depends_on = ["aws_api_gateway_method.pragmathanks_get_balance_api_method"]

  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  resource_id = "${aws_api_gateway_resource.pragmathanks_get_balance_api_resource.id}"
  http_method = "${aws_api_gateway_method.pragmathanks_get_balance_api_method.http_method}"
  integration_http_method = "POST"
  type = "AWS"
  uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.pragmathanks_get_balance_lambda.arn}/invocations"

  request_templates {
    "application/json" = <<EOF
{ "username": "$input.params('text')" }
EOF
  }
}

resource "aws_api_gateway_integration_response" "pragmathanks_get_balance_api_integration_response" {
  depends_on = ["aws_api_gateway_method.pragmathanks_get_balance_api_method", "aws_api_gateway_integration.pragmathanks_get_balance_api_integration"]

  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  resource_id = "${aws_api_gateway_resource.pragmathanks_get_balance_api_resource.id}"
  http_method = "${aws_api_gateway_method.pragmathanks_get_balance_api_method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"
}

resource "aws_api_gateway_method_response" "200" {
  depends_on = ["aws_api_gateway_method.pragmathanks_get_balance_api_method"]

  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  resource_id = "${aws_api_gateway_resource.pragmathanks_get_balance_api_resource.id}"
  http_method = "${aws_api_gateway_method.pragmathanks_get_balance_api_method.http_method}"
  status_code = "200"

  response_models = { "text/plain" = "Empty" }
}

resource "aws_lambda_permission" "pragmathanks_get_balance_api_lambda_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.pragmathanks_get_balance_lambda.function_name}"
  principal = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}/*/*/*"
}

resource "aws_api_gateway_deployment" "pragmathanks_get_balance_api_deployment" {
  depends_on = ["aws_api_gateway_integration.pragmathanks_get_balance_api_integration"]

  rest_api_id = "${aws_api_gateway_rest_api.pragmathanks_get_balance_api.id}"
  stage_name = "prod"
}
