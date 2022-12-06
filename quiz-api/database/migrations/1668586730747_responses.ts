import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'responses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('examinee_id')
      .unsigned()
      .references('examinees.id')
      .onDelete('CASCADE')
      table
      .integer('question_id')
      .unsigned()
      .references('questions.id')
      .onDelete('CASCADE')
      table
      .integer('choice_id')
      .unsigned()
      .references('choices.id')
      .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
