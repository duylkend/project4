import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { parseUserIdUtil } from '../../auth/utils.mjs'
import { deleteTodo } from '../../businessLogic/todo.mjs'
import { existTodo } from '../../businessLogic/todo.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const todoId = event.pathParameters.todoId;
    const authorization = event.headers.Authorization
    const userId = parseUserIdUtil(authorization)

    const validTodo = await existTodo(todoId, userId)
    if (!validTodo) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo does not exist'
        })
      }
    }
    await deleteTodo(userId, todoId)

    return {
      statusCode: 200
    };
  })