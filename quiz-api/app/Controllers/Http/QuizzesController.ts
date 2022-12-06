import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Choice from 'App/Models/Choice'
import Quiz from 'App/Models/Quiz'

export default class QuizzesController {
  public async index({ response }: HttpContextContract) {
    const quizzes = await Quiz.query().preload('question' , (q) => q.preload('choice'))
    return response.status(200).json(quizzes)
   }

  public async create({ }: HttpContextContract) { }

  public async store({ request, response }: HttpContextContract) {
    const title = request.input('title')
    const status = request.input('status')
    const questions = request.input('question')

    const trx = await Database.transaction()

    try {
      const quiz = await Quiz.create({
        title: title,
        status
      }, { client: trx })

      await quiz.related('question').updateOrCreateMany(questions, 'title')

      await quiz.load('question')

      const serializedQuiz = quiz.serialize()

      const savedQuestions = serializedQuiz.question
      savedQuestions.map(async (question: { id: any }, i: string | number) => {

        const choices = questions[i].choice
        const arrayChoices = choices.map((choice: { title: any }, i: any) => {
          return {
            title: choice.title,
            questionId: question.id
          }
        })
        await Choice.createMany(arrayChoices)

      })

     const res = await Quiz.query().preload('question' , (q) => q.preload('choice'))

      await trx.commit()

      return response.status(200).json({ message: 'saved', data: res })
    } catch (error) {
      await trx.rollback()
    }

  }

  public async show({ response }: HttpContextContract) { 
    const getQuiz = await Quiz.query().preload('question' , (q) => q.preload('choice'))
    return response.status(200).json(getQuiz)
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ response, params }: HttpContextContract) {
    console.log(params.id, params, 'params') 
    const quiz = await Quiz.findOrFail(params.id)

    await quiz.delete()

    return response.status(200).json(quiz)
  }
}
