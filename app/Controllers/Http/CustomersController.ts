import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exceptions from 'App/Exceptions'
import Customer from 'App/Models/Customer'
import { Create, Delete, GetMultiple, Update } from 'App/Validators/Customer'

export default class CustomersController {
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(Create)
    await Customer.create(payload).catch((err) => {
      console.log('Error While customer creating => ', err)
      throw Exceptions.conflict('Error while customer creating')
    })
    return {
      success: true,
      message: 'Customer Created Successfully',
    }
  }

  public async getMultiple({ request }: HttpContextContract) {
    const { page, limit, orderByColumn, orderByValue } = await request.validate(GetMultiple)
    return await Customer.query()
      .preload('sites')
      .orderBy(orderByColumn, orderByValue)
      .paginate(page, limit)
      .then((d) => d.toJSON())
      .catch((err) => {
        console.log('Error while fetching customer => ', err)
        throw Exceptions.conflict('Error while fetching customer')
      })
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(Update)
    const customer = await Customer.find(payload.id)

    if (customer) {
      await customer
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error while updating customer => ', err)
          throw Exceptions.conflict('Error while updating customer')
        })
    } else {
      throw Exceptions.notFound('Customer not found')
    }

    return {
      success: true,
      message: 'Customer Updated Successfully',
    }
  }

  public async delete({ request }: HttpContextContract) {
    const payload = await request.validate(Delete)
    const customer = await Customer.find(payload.id)

    if (customer) {
      await customer
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error while deleting customer => ', err)
          throw Exceptions.conflict('Error while deleting customer')
        })
    } else {
      throw Exceptions.notFound('Customer not found')
    }

    return {
      success: true,
      message: 'Customer Deleted Successfully',
    }
  }
}
