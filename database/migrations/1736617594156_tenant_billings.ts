import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tenant_billings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').references('id').inTable('tenants')
      table.date('billing_start_date')
      table.date('billing_end_date')
      table.integer('start_eb_read')
      table.integer('end_eb_read')
      table.string('created_by').notNullable()
      table.string('updated_by').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
