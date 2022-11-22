import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Choice from 'App/Models/Choice'
import Quiz from 'App/Models/Quiz'

export default class QuizzesController {
  public async index({ }: HttpContextContract) { }

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
        console.log(question, 'questionahoighaiowfho')

        const choices = questions[i].choice
        const arrayChoices = choices.map((choice: { title: any }, i: any) => {
          return {
            title: choice.title,
            questionId: question.id
          }
        })
        await Choice.createMany(arrayChoices)

      })

      // await quiz.refresh()
     const res = await Quiz.query().preload('question' , (q) => q.preload('choice'))

      await trx.commit()

      return response.status(200).json({ message: 'saved', data: res })
    } catch (error) {
      await trx.rollback()
    }

  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
