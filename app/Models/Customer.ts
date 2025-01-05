import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Site from './Site'

export default class Customer extends BaseModel {
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

  @hasMany(() => Site)
  public sites: HasMany<typeof Site>
}
