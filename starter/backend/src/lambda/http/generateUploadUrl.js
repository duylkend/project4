import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { parseUserIdUtil } from '../../auth/utils.mjs'
import { createImage } from '../../businessLogic/image.mjs'
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
    console.log('userId: ', userId)
    console.log('todoId: ', todoId)
    const validTodo = await existTodo(todoId, userId)
    if (!validTodo) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Todo does not exist'
        })
      }
    }
    const newItem = await createImage(userId, todoId, event)

    return {
      statusCode: 201,
      body: JSON.stringify(newItem)
    };
  })