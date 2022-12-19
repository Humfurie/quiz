import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Examinee from 'App/Models/Examinee'
import Response from 'App/Models/Response'

export default class ExamineesController {
  public async create({ request, response }: HttpContextContract) {
    const answer = await request.body().answer
    console.log(answer)
    try {
      const examinee = answer.map((value: {userId: number, quizId: number}, id: number) => {
        return {
          userId: value.userId,
          quizId: value.quizId
        }
      })
      // const insertExaminee = await Database.table('examinees').returning('id').insert(examinee)
      await Examinee.createMany(examinee)

      const examineeResponse = answer.map((value: {choiceId:number, questionId: number}, id: number) => {
        return {
          questionId: value.questionId,
          choiceId: value.choiceId
        }
      })
      await Response.createMany(examineeResponse)

      // await examinee.related('response')
      // await examinee.load('response')

      // const serializedExaminee = examinee.serialize()

      // const savedExaminee = serializedExaminee

      return response.status(200).json({message: 'stored'})

    } catch (error) {

    }

  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
