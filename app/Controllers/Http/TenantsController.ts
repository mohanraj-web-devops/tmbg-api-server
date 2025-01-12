import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exceptions from 'App/Exceptions'
import Tenant from 'App/Models/Tenant'
import { Create, Update, Delete, GetMultiple } from 'App/Validators/Tenant'

export default class TenantsController {
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(Create)
    await Tenant.create(payload).catch((err) => {
      console.log('Error While Tenant creating => ', err)
      throw Exceptions.conflict('Error while Tenant creating')
    })

    return {
      success: true,
      message: 'Tenant Created Successfully',
    }
  }

  public async getMultiple({ request }: HttpContextContract) {
    const { page, limit, orderByColumn, orderByValue } = await request.validate(GetMultiple)
    return await Tenant.query()
      .preload('tenantBilling')
      .orderBy(orderByColumn, orderByValue)
      .paginate(page, limit)
      .then((d) => d.toJSON())
      .catch((err) => {
        console.log('Error while fetching tenant => ', err)
        throw Exceptions.conflict('Error while fetching tenant')
      })
  }

  public async update({ request }: HttpContextContract) {
    const { id, ...payload } = await request.validate(Update)
    const tenant = await Tenant.find(id)
    if (tenant) {
      await tenant
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error While Tenant Updating => ', err)
          throw Exceptions.conflict('Error While Tenant Updating')
        })
    } else {
      throw Exceptions.notFound('Tenant Id Not Exists.')
    }

    return {
      success: true,
      message: 'Tenant Updated Successfully',
    }
  }

  public async delete({ request }: HttpContextContract) {
    const { id, ...payload } = await request.validate(Delete)
    const tenant = await Tenant.find(id)
    if (tenant) {
      await tenant
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error While Tenant Deleting => ', err)
          throw Exceptions.conflict('Error While Tenant Deleting')
        })
    } else {
      throw Exceptions.notFound('Tenant Id Not Exists.')
    }

    return {
      success: true,
      message: 'Tenant Deleted Successfully',
    }
  }
}
