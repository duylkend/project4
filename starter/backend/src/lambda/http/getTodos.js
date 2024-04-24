import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { parseUserIdUtil } from '../../auth/utils.mjs'
import { getTodos } from '../../businessLogic/todo.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    console.log('Processing event: ', event)

    const newTodo = JSON.parse(event.body)

    const authorization = event.headers.Authorization

    const userId = parseUserIdUtil(authorization)

    const result = await getTodos(userId)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items: result.Items
        })
      }
  })