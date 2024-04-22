import * as cdk from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { AssetCode, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket

    const bucket = new Bucket(this, "s3bucketlogicalid123", {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // IAM role

    const role = new Role(this, "rolelogicalid123", {
      roleName: "bankingLambdaRole",
      description: "role for lambda to access S3",
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });

    role.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")
    );

    const lamdafunction = new Function(this, "lambdafunctionlogicalid123", {
      runtime: Runtime.PYTHON_3_12,
      handler: "lambda_function.lambda_handler",
      code: new AssetCode("../services"),
      role: role,
    });

    const apiGateway = new LambdaRestApi(this, "apiGatewaylogicalid123", {
      handler: lamdafunction,
      restApiName: "bankingApi",
      deploy: true,
      proxy: false,
    });

    const bankStatus = apiGateway.root.addResource("bankStatus");
    bankStatus.addMethod("GET");
  }
}
