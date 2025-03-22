import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DATE_FORMAT } from 'App/data/consts'

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
        table: 'tenant_billings',
        column: 'id',
      }),
    ]),
    tenantId: schema.number([
      rules.unsigned(),
      rules.exists({
        table: 'tenant_billings',
        column: 'tenant_id',
      }),
    ]),
    billingStartDate: schema.date.optional({ format: DATE_FORMAT }),
    billingEndDate: schema.date.optional({ format: DATE_FORMAT }),
    startEbRead: schema.number.optional([rules.unsigned()]),
    endEbRead: schema.number.optional([rules.unsigned()]),
    updatedBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
