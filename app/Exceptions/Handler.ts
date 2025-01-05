/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }
  public async handle(error: any, ctx: HttpContextContract) {
    const success = false

    if (error.isInternalException) {
      ctx.response.status(error.status)
      return { success, message: error.code }
    }

    switch (error.code) {
      case 'E_VALIDATION_FAILURE':
        return { success: false, message: error.messages.errors[0].message }

      case 'E_ROUTE_NOT_FOUND':
        return { success: false, message: error.message, code: error.code }

      case 'E_ROW_NOT_FOUND':
        return { success: false, message: 'Requested row not found', code: error.code }

      default:
        if (['stage', 'preprod'].includes(process.env.NODE_ENV || '')) {
          ctx.response.status(500).send({ message: error.message, stack: error.stack })

          console.log('ERROR', error)
        } else {
          ctx.response.status(500).send({ message: 'Somethig went wrong', stack: error.stack })

          console.log('ERROR', error)
        }
    }
  }
}
