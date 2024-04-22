import json
import boto3

client = boto3.client('s3')

def lambda_handler(event, context):
    response = client.get_object(
        Bucket='ibankingstatusapp01-s3bucketlogicalid123a2c0c9fb-4fbgffek7fe4',
        Key='accountStatus.json',
    )

    data_byte = response['Body'].read()

    data_string = data_byte.decode('utf-8')

    data_dict = json.loads(data_string)

    return {
        'statusCode': 200,
        'body': json.dumps(data_dict),
        'headers': {'Content-Type': 'application/json'},
    }
