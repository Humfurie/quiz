import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, } from '@ioc:Adonis/Lucid/Orm'
import Response from './Response'

export default class Examinee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public quizId: number
  
  @column()
  public score: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Response)
  public response: HasOne<typeof Response>
}
