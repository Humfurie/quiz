import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Answer from 'App/Models/Answer'
import Choice from 'App/Models/Choice'
import Question from 'App/Models/Question'
import Quiz from 'App/Models/Quiz'

export default class QuizzesController {
  public async index({ response }: HttpContextContract) {
    const quizzes = await Quiz.query().preload('question', (q) => q.preload('choice'))
    return response.status(200).json(quizzes)
  }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {
    const title = request.input('title')
    const status = request.input('status')
    const questions = request.input('question')

    const trx = await Database.transaction()

    try {

      const quiz = new Quiz()
      quiz.title = title
      quiz.status = status
      quiz.useTransaction(trx)
      await quiz.save()
    
      let questionIndex = 0
      while (questionIndex < questions.length) {
        const question = new Question()
        question.quizId = quiz.id
        question.title = questions[questionIndex].title
        question.useTransaction(trx)
        await question.save()
        
        let choiceIndex = 0
        while (choiceIndex < questions[questionIndex].choice.length) {
          const choice = new Choice()
          choice.questionId = question.id
          choice.title = questions[questionIndex].choice[choiceIndex].title
          choice.useTransaction(trx)
          await choice.save()

          let correctAnswer = questions[questionIndex].choice[choiceIndex].answer
          if(correctAnswer === true){
            const answer = new Answer()
            answer.questionId = question.id
            answer.choiceId = choice.id
            answer.useTransaction(trx)
            await answer.save()
          }
          choiceIndex++
        }
        questionIndex++
      }

      const res = await Quiz.query().preload('question', (q) => q.preload('choice', (c) => c.preload('answer')))

      await trx.commit()

      return response.status(200).json({ message: 'saved', data: res })
    } catch (error) {
      await trx.rollback()
    }

  }

  public async show({ response }: HttpContextContract) {
    const getQuiz = await Quiz.query().preload('question', (q) => q.preload('choice', (c) => c.preload('answer')))

    return response.status(200).json(getQuiz)
  }


  public async update({ }: HttpContextContract) { }

  public async destroy({ response, params }: HttpContextContract) {
    // console.log(params.id, params, 'params') 
    const quiz = await Quiz.findOrFail(params.id)

    await quiz.delete()

    return response.status(200).json(quiz)
  }
}
