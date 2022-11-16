import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Examinee from './Examinee'
import Question from './Question'
import Choice from './Choice'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Examinee)
  public examinee: BelongsTo<typeof Examinee>

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @belongsTo(() => Choice)
  public choice: BelongsTo<typeof Choice>
}
