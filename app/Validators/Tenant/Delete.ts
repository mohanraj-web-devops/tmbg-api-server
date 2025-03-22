import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Delete {
  constructor(protected ctx: HttpContextContract) {}

  public get data() {
    return {
      ...this.ctx.request.all(),
      id: Number(this.ctx.request.param('id')),
      isActive: 0,
    }
  }

  public schema = schema.create({
    id: schema.number([
      rules.unsigned(),
      rules.exists({
        table: 'tenants',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    isActive: schema.number([rules.unsigned()]),
    updatedBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
