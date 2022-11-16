import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'examinees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')// delete post when user is deleted
      table
      .integer('quiz_id')
      .unsigned()
      .references('quizzes.id')
      table.integer('score', 255)


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
