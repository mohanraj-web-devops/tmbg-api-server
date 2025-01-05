import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).nullable()
      table.string('email').nullable().unique()
      table.string('phone_number', 15).nullable()
      table.integer('customer_id').references('id').inTable('customers')
      table.integer('site_id').references('id').inTable('sites')
      table.dateTime('joining_date').notNullable()
      table.decimal('rent_amount', 10, 2).notNullable()
      table.decimal('water_charge', 10, 2).notNullable()
      table.decimal('eb_unit_rate', 10, 2).notNullable()
      table.decimal('maintenance_charge', 10, 2).notNullable()
      table.integer('inital_eb_reading').notNullable()
      table.integer('is_active').defaultTo(0)
      table.boolean('is_archive').defaultTo(false)
      table.string('created_by').nullable()
      table.string('updated_by').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
