import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customerId: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public postalCode: string

  @column()
  public country: string

  @column()
  public createdBy: string

  @column()
  public updatedBy: string

  @column()
  public isActive: number

  @column()
  public isArchive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>
}
