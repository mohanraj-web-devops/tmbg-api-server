import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DATE_FORMAT } from 'App/data/consts'

export default class Create {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({
        table: 'tenants',
        column: 'email',
      }),
    ]),
    phoneNumber: schema.string({ trim: true }),
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
    siteId: schema.number([
      rules.exists({
        table: 'sites',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    joiningDate: schema.date({ format: DATE_FORMAT }, [rules.beforeOrEqual('today')]),
    rentAmount: schema.number([rules.unsigned()]),
    waterCharge: schema.number([rules.unsigned()]),
    ebUnitRate: schema.number([rules.unsigned()]),
    maintenanceCharge: schema.number([rules.unsigned()]),
    initialEbReading: schema.number([rules.unsigned()]),
    createdBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
