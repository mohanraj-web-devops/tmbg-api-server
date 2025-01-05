import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exceptions from 'App/Exceptions'
import Tenant from 'App/Models/Tenant'
import { Create } from 'App/Validators/Tenant'

export default class TenantsController {
    public async create({request} : HttpContextContract){
        const payload = await request.validate(Create)
        await Tenant.create(payload).catch((err) => {
            console.log('Error While site creating => ', err)
            throw Exceptions.conflict('Error while site creating')
        })

        return {
            success: true,
            message: 'Tenant Created Successfully'
        }
    }
}
