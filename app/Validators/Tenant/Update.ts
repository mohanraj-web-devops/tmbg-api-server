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
        table: 'tenants',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    firstName: schema.string.optional({ trim: true }),
    lastName: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({
        table: 'tenants',
        column: 'email',
      }),
    ]),
    phoneNumber: schema.string.optional({ trim: true }),
    customerId: schema.number.optional([
      rules.exists({
        table: 'customers',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    siteId: schema.number.optional([
      rules.exists({
        table: 'sites',
        column: 'id',
        where: {
          is_active: 1,
          is_archive: false,
        },
      }),
    ]),
    joiningDate: schema.date.optional({ format: DATE_FORMAT }, [rules.beforeOrEqual('today')]),
    rentAmount: schema.number.optional([rules.unsigned()]),
    waterCharge: schema.number.optional([rules.unsigned()]),
    ebUnitRate: schema.number.optional([rules.unsigned()]),
    maintenanceCharge: schema.number.optional([rules.unsigned()]),
    initialEbReading: schema.number.optional([rules.unsigned()]),
    updatedBy: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
