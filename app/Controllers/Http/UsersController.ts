import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'
import Exceptions from 'App/Exceptions'
import User from 'App/Models/User'
import { register, login } from 'App/Validators/User'
import { TOKEN_EXPIRE_TIME, DEFAULT_PAGINATION } from 'App/data/consts'

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(register)
    await User.create(payload).catch((err) => {
      console.log('Error While User Register => ', err)
      throw Exceptions.conflict('Error while user register')
    })
    return {
      success: true,
      message: 'User Registered Successfully',
    }
  }

  public async login({ request }: HttpContextContract) {
    const { email, password } = await request.validate(login)
    const user = await User.findBy('email', email)
    if (user) {
      //verify password
      if (await Hash.verify(user.password, password)) {
        //correct password
        const token = jwt.sign(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          Env.get('APP_KEY'),
          { expiresIn: TOKEN_EXPIRE_TIME }
        )
        return {
          success: true,
          message: 'User Logged In Successfully',
          token,
        }
      } else {
        //incorrect password
        throw Exceptions.badRequest('Incorrect Password.')
      }
    } else {
      throw Exceptions.notFound('User not found')
    }
  }

  public async getMultiple({ request }: HttpContextContract) {
    return await User.query()
      .paginate(DEFAULT_PAGINATION.PAGE, DEFAULT_PAGINATION.LIMIT)
      .then((d) => d.toJSON())
      .catch((err) => {
        console.log('Error While User GetMultiple => ', err)
        throw Exceptions.conflict('Error while fetching user list')
      })
  }
}
