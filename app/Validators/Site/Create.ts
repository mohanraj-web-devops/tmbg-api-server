import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Create {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    customerId: schema.number([
      rules.exists({
        table: 'customers',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    name: schema.string({ trim: true }),
    address: schema.string({ trim: true }),
    city: schema.string({ trim: true }),
    state: schema.string({ trim: true }),
    postalCode: schema.string({ trim: true }),
    country: schema.string({ trim: true }),
    createdBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
