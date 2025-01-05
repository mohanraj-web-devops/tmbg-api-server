import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Update {
  constructor(protected ctx: HttpContextContract) {}

  public get data() {
    return {
      ...this.ctx.request.all(),
      id: Number(this.ctx.request.param('id')),
    }
  }

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
      rules.exists({
        table: 'customers',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    firstName: schema.string.optional({ trim: true }),
    lastName: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    phoneNumber: schema.string.optional({ trim: true }),
    address: schema.string.optional({ trim: true }),
    city: schema.string.optional({ trim: true }),
    state: schema.string.optional({ trim: true }),
    postalCode: schema.string.optional({ trim: true }),
    country: schema.string.optional({ trim: true }),
    updatedBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
