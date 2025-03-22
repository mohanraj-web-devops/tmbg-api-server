import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tenant from './Tenant'

export default class TenantBilling extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tenantId: number

  @column()
  public billingStartDate: DateTime

  @column()
  public billingEndDate: DateTime

  @column()
  public startEbRead: number

  @column()
  public endEbRead: number

  @column()
  public createdBy: string

  @column()
  public updatedBy: string

  @belongsTo(() => Tenant)
  public tenant: BelongsTo<typeof Tenant>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
