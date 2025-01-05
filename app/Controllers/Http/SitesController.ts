import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exceptions from 'App/Exceptions'
import Site from 'App/Models/Site'
import { Create, Delete, GetMultiple, Update } from 'App/Validators/Site'

export default class SitesController {
  public async create({ request }: HttpContextContract) {
    const payload = await request.validate(Create)
    await Site.create(payload).catch((err) => {
      console.log('Error While site creating => ', err)
      throw Exceptions.conflict('Error while site creating')
    })
    return {
      success: true,
      message: 'Site Created Successfully',
    }
  }

  public async getMultiple({ request }: HttpContextContract) {
    const { page, limit, orderByColumn, orderByValue } = await request.validate(GetMultiple)
    return await Site.query()
      .preload('customer')
      .orderBy(orderByColumn, orderByValue)
      .paginate(page, limit)
      .then((d) => d.toJSON())
      .catch((err) => {
        console.log('Error while fetching site => ', err)
        throw Exceptions.conflict('Error while fetching site')
      })
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(Update)
    const site = await Site.find(payload.id)

    if (site) {
      await site
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error while updating site => ', err)
          throw Exceptions.conflict('Error while updating site')
        })
    } else {
      throw Exceptions.notFound('Site not found')
    }

    return {
      success: true,
      message: 'Site Updated Successfully',
    }
  }

  public async delete({ request }: HttpContextContract) {
    const payload = await request.validate(Delete)
    const site = await Site.find(payload.id)

    if (site) {
      await site
        .merge(payload)
        .save()
        .catch((err) => {
          console.log('Error while deleting site => ', err)
          throw Exceptions.conflict('Error while deleting site')
        })
    } else {
      throw Exceptions.notFound('site not found')
    }

    return {
      success: true,
      message: 'Site Deleted Successfully',
    }
  }
}
