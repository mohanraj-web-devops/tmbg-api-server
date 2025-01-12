import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DATE_FORMAT } from 'App/data/consts'

export default class Create {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tenantId: schema.number([
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
    billingStartDate: schema.date({ format: DATE_FORMAT }),
    billingEndDate: schema.date({ format: DATE_FORMAT }),
    startEbRead: schema.number([rules.unsigned()]),
    endEbRead: schema.number([rules.unsigned()]),
    createdBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
