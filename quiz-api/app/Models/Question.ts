import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Choice from './Choice'
import Answer from './Answer'

export default class Question extends BaseModel {
  query() {
    throw new Error('Method not implemented.')
  }
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public quizId: number
  
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Choice)
  public choice: HasMany<typeof Choice>

  @hasOne(() => Answer)
  public answer: HasOne<typeof Answer>
}
