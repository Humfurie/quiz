import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'
import Choice from './Choice'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @belongsTo(() => Choice)
  public choice: BelongsTo<typeof Choice>
}
