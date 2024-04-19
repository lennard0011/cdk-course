import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket

    const s3demobucket = new Bucket(this, 's3demobucket0122', {
      bucketName: 's3-bucket-demo-01222022',
      versioned: false,
      publicReadAccess: false,
    });
  }
}
