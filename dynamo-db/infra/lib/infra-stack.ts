import * as cdk from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dynamoDbTable = new Table(this, 'dynamodblogicalid', {
      tableName: 'dynamo-db-table',
      readCapacity: 3,
      writeCapacity: 3,
      partitionKey: { name: 'id', type: AttributeType.STRING },
    });
  }
}
