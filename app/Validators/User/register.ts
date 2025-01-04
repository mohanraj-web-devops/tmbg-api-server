import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class register {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.unique({
        table: 'users',
        column: 'email',
      }),
      rules.email(),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      //include regex for password contain one uppercase, lowercase and special character
    ]),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
