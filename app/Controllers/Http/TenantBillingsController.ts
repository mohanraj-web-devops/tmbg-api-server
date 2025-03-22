import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exceptions from 'App/Exceptions'
import TenantBilling from 'App/Models/TenantBilling'
import { Create, GetMultiple, Update } from 'App/Validators/Billing'

export default class TenantBillingsController {
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(Create)
    await TenantBilling.create(payload).catch((err) => {
      console.log('Error While Tenant Billing Creating => ', err)
      throw Exceptions.conflict('Error while Tenant Billing Creating')
    })

    return {
      success: true,
      message: 'Tenant Billing Created Successfully',
    }
  }

  public async update({ request }: HttpContextContract) {
    const { id, ...payload } = await request.validate(Update)
    const billing = await TenantBilling.find(id)

    if (billing) {
      await billing
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error While Tenant Billing Updating => ', err)
          throw Exceptions.conflict('Error while Tenant Billing Updating')
        })
    } else {
      throw Exceptions.notFound('Tenant Billing Id Not Exists.')
    }

    return {
      success: true,
      message: 'Tenant Billing Updated Successfully',
    }
  }

  public async getMultiple({ request }: HttpContextContract) {
    const { limit, orderByColumn, orderByValue, page } = await request.validate(GetMultiple)

    return await TenantBilling.query()
      .preload('tenant')
      .orderBy(orderByColumn, orderByValue)
      .paginate(page, limit)
      .then((d) => d.toJSON())
      .catch((err) => {
        console.log('Error While Tenant Billing Fetching => ', err)
        throw Exceptions.conflict('Error while Tenant Billing Fetching')
      })
  }
}
