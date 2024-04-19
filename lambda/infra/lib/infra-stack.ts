import * as cdk from "aws-cdk-lib";
import { Alarm } from "aws-cdk-lib/aws-cloudwatch";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const cloudFunction = new Function(this, "lambdafunctionlogicalid", {
      handler: "lambda_function.lambda_handler",
      runtime: Runtime.PYTHON_3_12,
      code: Code.fromAsset("../services/"),
      functionName: "MyFunction",
    });

    const alarm = new Alarm(this, "cloudwatchlogicalid", {
      evaluationPeriods: 1,
      threshold: 1,
      metric: cloudFunction.metricErrors(),
    });
  }
}
