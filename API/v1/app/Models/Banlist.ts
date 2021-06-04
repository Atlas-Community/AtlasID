import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Banlist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public steamid: string

  @column()
  public ip: string

  @column()
  public bannedAt: DateTime

  @column()
  public bannedUntil: DateTime

  @column()
  public bannedBy: string

  @column()
  public reason: string
}
