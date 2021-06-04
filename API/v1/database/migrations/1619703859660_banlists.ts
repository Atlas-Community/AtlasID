import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Banlists extends BaseSchema {
  protected tableName = 'banlists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("steamid").nullable()
      table.string("ip").nullable()
      table.dateTime("banned_at").notNullable()
      table.dateTime("banned_until").notNullable()
      table.string("banned_by").notNullable()
      table.string("reason").nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
