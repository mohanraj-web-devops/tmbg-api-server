import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name').nullable()
      table.string('email').unique().notNullable()
      table.string('phone_number', 15)
      table.text('address')
      table.string('city', 100)
      table.string('state', 100)
      table.string('postal_code', 20)
      table.string('country', 100)
      table.string('created_by').nullable()
      table.string('updated_by').nullable()
      table.integer('is_active').defaultTo(0)
      table.boolean('is_archive').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
