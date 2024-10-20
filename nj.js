const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const taskId = event.pathParameters.id;

    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        await dynamodb.put({
            TableName: 'TasksTable',
            Item: { id: taskId, task: body.task }
        }).promise();
        return { statusCode: 201, body: JSON.stringify({ message: "Task created" }) };
    }

    if (event.httpMethod === 'GET') {
        const result = await dynamodb.get({
            TableName: 'TasksTable',
            Key: { id: taskId }
        }).promise();
        return { statusCode: 200, body: JSON.stringify(result.Item) };
    }
};
