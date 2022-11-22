import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import Response from './Response'

export default class Choice extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public questionId: number
  
  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Answer)
  public answer: HasOne<typeof Answer>

  @hasOne(() => Response)
  public response: HasOne<typeof Response>
}
