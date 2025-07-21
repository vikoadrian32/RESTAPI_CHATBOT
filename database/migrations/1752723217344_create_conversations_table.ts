import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'conversations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('session_id').notNullable()
      table.integer('message_id').unsigned()
      .notNullable()
      .references('id')
      .inTable('messages')
      .onDelete('CASCADE')
      table.text('last_message').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}