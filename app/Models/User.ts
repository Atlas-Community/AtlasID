import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public steamid64: string

  @column()
  public ip: string

  @column()
  public rank?: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public firstLogin: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public lastLogin: DateTime

  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
