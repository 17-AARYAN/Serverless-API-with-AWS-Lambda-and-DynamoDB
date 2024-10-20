import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TasksTable')

def lambda_handler(event, context):
    task_id = event['pathParameters']['id']
    
    if event['httpMethod'] == 'POST':
        body = json.loads(event['body'])
        table.put_item(Item={'id': task_id, 'task': body['task']})
        return {"statusCode": 201, "body": json.dumps({"message": "Task created"})}
    
    elif event['httpMethod'] == 'GET':
        response = table.get_item(Key={'id': task_id})
        return {"statusCode": 200, "body": json.dumps(response.get('Item', {}))}
