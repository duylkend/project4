import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())
const todoTable = process.env.TODOS_TABLE
export class TodoAccess {
  async createTodo(todo) {
    console.log(`Creating a todo with id ${todo.todoId}`)

    await dynamoDbClient.put({
      TableName: todoTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(todo) {
    console.log(`Updating a todo with id ${todo.todoId}`)
    const userId = todo.userId
    const todoId =  todo.todoId
    await dynamoDbClient.update({
      TableName: todoTable,
      Key: { userId, todoId },
      UpdateExpression: 'SET name = :value1, done = :value2',
      ExpressionAttributeValues: {
        ':value1': todo.name,
        ':value2': todo.done
      },
      ReturnValues: 'ALL_NEW'
    })
    .promise();
    return todo
  }


  async getTodos(userId) {
    return dynamoDbClient.query({
        TableName: todoTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
        Limit: 20
    })
}
async deleteTodo(userId, todoId) {
    await dynamoDbClient.delete({
        TableName: todoTable,
        Key: { userId, todoId }
    })
}

async todoExists(todoId, userId) {
    const result = await dynamoDbClient.get({
      TableName: todoTable,
      Key: {
        todoId, userId
      }
    })
    return result.Item
  }

}
