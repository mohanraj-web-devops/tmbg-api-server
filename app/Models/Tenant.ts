import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TenantBilling from './TenantBilling'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public phoneNumber: string

  @column()
  public customerId: number

  @column()
  public siteId: number

  @column()
  public joiningDate: DateTime

  @column()
  public rentAmount: number

  @column()
  public waterCharge: number

  @column()
  public ebUnitRate: number

  @column()
  public maintenanceCharge: number

  @column()
  public initialEbReading: number

  @column()
  public isActive: number

  @column()
  public isArchive: boolean

  @column()
  public createdBy: string

  @column()
  public updatedBy: string

  @hasMany(() => TenantBilling)
  public tenantBilling: HasMany<typeof TenantBilling>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
