import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Exceptions from 'App/Exceptions'
import jwt from 'jsonwebtoken'

export default class Auth {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authHeader = request.header('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        if (request.ctx) {
          request.ctx.token = jwt.verify(token, Env.get('APP_KEY'))
          const actionBy = request.ctx.token.email
          request.all().createdBy = actionBy
          request.all().updatedBy = actionBy
        }
      } catch (err) {
        console.log('Auth Middleware Error => ', err)
        throw Exceptions.forbidden('Invalid token')
      }
    } else {
      throw Exceptions.badRequest('Require Authorization Header')
    }
    await next()
  }
}
