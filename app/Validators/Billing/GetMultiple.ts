import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DEFAULT_ORDER, DEFAULT_PAGINATION } from 'App/data/consts'

export default class GetMultiple {
  constructor(protected ctx: HttpContextContract) {}

  public get data() {
    //need to add filter variable
    return {
      ...this.ctx.request.all(),
      page: this.ctx.request.input('page', DEFAULT_PAGINATION.PAGE),
      limit: this.ctx.request.input('limit', DEFAULT_PAGINATION.LIMIT),
      orderByValue: this.ctx.request.input('orderByValue', DEFAULT_ORDER.ASC),
      orderByColumn: this.ctx.request.input('orderByColumn', 'id'),
    }
  }

  public schema = schema.create({
    page: schema.number([rules.unsigned()]),
    limit: schema.number([rules.unsigned()]),
    orderByValue: schema.enum(['asc', 'desc'] as const),
    orderByColumn: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {
    '*': (field, rule) => {
      return `${rule} validation error on ${field}`
    },
  }
}
