import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Banlists extends BaseSchema {
  protected tableName = 'banlists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("steamid").nullable()
      table.string("ip").nullable()
      table.dateTime("bannedAt").notNullable()
      table.dateTime("bannedUntil").notNullable()
      table.string("bannedBy").notNullable()
      table.string("reason").nullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
