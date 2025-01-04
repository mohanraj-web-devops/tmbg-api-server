import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { register } from 'App/Validators/User'

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(register)
    await User.create(payload).catch((err) => {
      console.log('Error While User Register => ', err)
    })
    return {
      success: true,
      message: 'User Registered Successfully',
    }
  }
}
