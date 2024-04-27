import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { parseUserIdUtil } from '../../auth/utils.mjs'
import { existTodo } from '../../businessLogic/todo.mjs'
import { updateTodo } from '../../businessLogic/todo.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const todo = JSON.parse(event.body)

    const authorization = event.headers.Authorization
    const todoId = event.pathParameters.todoId;
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

    const urlImage = await existTodo(todoId, userId)
    const result = await updateTodo(todo)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items: result.Items
        })
      }
  })