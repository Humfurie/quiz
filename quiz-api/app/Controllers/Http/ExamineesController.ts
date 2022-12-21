import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Answer from 'App/Models/Answer'
import Examinee from 'App/Models/Examinee'
import Question from 'App/Models/Question'
import Response from 'App/Models/Response'

export default class ExamineesController {
  public async create({ request, response }: HttpContextContract) {
    const answer = await request.body().answer
    const userId = await request.body().userId
    const quizId = await request.body().quizId

    const trx = await Database.transaction()
    try {
      console.log("answer", answer)

      
      let countIndex = 0
      let count = 0
      
      while(countIndex < answer.length){
        const correctAnswer = await Answer.query({client:trx}).where('questionId', answer[countIndex].questionId).andWhere('choiceId', answer[countIndex].choiceId)
      
        console.log(correctAnswer.length)
        if(correctAnswer.length > 0){
          count++
        }

        countIndex++
      }
       console.log(countIndex)
       console.log(count)
      

       const examinee = new Examinee()
       examinee.userId = userId
       examinee.quizId = quizId
       examinee.score = count
       examinee.useTransaction(trx)
       await examinee.save()

      let answerIndex = 0
      while(answerIndex < answer.length){
        const responses = new Response()
        responses.examineeId = examinee.id
        responses.questionId = answer[answerIndex].questionId
        responses.choiceId = answer[answerIndex].choiceId
        responses.useTransaction(trx)
        await responses.save()

        answerIndex++
      }

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
