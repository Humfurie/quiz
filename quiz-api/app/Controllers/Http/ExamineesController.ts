import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Answer from 'App/Models/Answer'
import Examinee from 'App/Models/Examinee'
import Question from 'App/Models/Question'
import Response from 'App/Models/Response'

export default class ExamineesController {
  public async create({ request, response }: HttpContextContract) {
    const answer = await request.body().answer

    const trx = await Database.transaction()
    try {
      console.log("answer", answer)

      
      let countIndex = 0
      let count = 0
      
      while(countIndex < answer.length){
        
        const correctAnswer = await Answer.query().whereIn(['questionId', 'choiceId'], [[answer[countIndex].questionId, answer[countIndex].choiceId]])
        console.log(correctAnswer.length)
        // .where('questionId', answer[countIndex].questionId).orWhere('choiceId', answer[countIndex].choiceId).count('id')


        countIndex++
      }
       console.log(countIndex)
       console.log(count)
      
      let answerIndex = 0
      while(answerIndex < answer.length){

        const examinee = new Examinee()
        examinee.userId = answer[answerIndex].userId
        examinee.quizId = answer[answerIndex].quizId
        examinee.score = count
        examinee.useTransaction(trx)
        // await examinee.save()

        answerIndex++
      }
        

      // const examinee = answer.map(async (value: { userId: number, quizId: number, questionId: number, choiceId: number }, id: number) => {
      //   const savedAnswer = Answer.query({ client: trx }).where('questionId', value.questionId).first()
      //   let index = 0
      //   while (index < )

      //     return {
      //       userId: value.userId,
      //       quizId: value.quizId,
      //       score: 
      //     }
      // })
      // const createExaminee = await Examinee.createMany(examinee, { client: trx })
      // const savedExaminee = createExaminee.map((examinee: { id: number, userId: number, quizId: number }, _: number) => {
      //   return {
      //     id: examinee.id,
      //     // userId: examinee.userId,
      //     // quizId: examinee.quizId
      //   }
      // })

      // const examineeResponse = answer.map((value: { choiceId: number, questionId: number }, id: number) => {
      //   let index = 0
      //   while (index < savedExaminee.length) {

      //     return {
      //       examineeId: savedExaminee[index].id,
      //       questionId: value.questionId,
      //       choiceId: value.choiceId
      //     }
      //   }
      // })
      // console.log(examineeResponse, "haw")
      // await Response.createMany(examineeResponse, { client: trx })

      await trx.commit()

      return response.status(200).json({ message: 'stored' })

    } catch (error) {
      await trx.rollback()
    }

  }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
