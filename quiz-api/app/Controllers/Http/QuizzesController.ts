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
      const quiz = await Quiz.create({
        title: title,
        status
      }, { client: trx })

      await quiz.related('question').updateOrCreateMany(questions, 'title')

      await quiz.load('question')


      const serializedQuiz = quiz.serialize()

      const savedQuestions = serializedQuiz.question

      let index = 0

      while (index < savedQuestions.length) {

        const queryQuestion = await Question.query({ client: trx }).where({ id: savedQuestions[index].id }).first()
        console.log(queryQuestion?.serialize(), savedQuestions[index].id)
        if (!queryQuestion) throw new Error('kjahdkjasd')

        await queryQuestion.related('choice').updateOrCreateMany(questions[index].choice, 'title')

        await queryQuestion.load('choice')

        const serializedQuestion = queryQuestion.serialize()

        const savedChoices = serializedQuestion.choice

        const correctAnswer = savedChoices.find((_: any, idx: number) => questions[index].choice[idx].answer)

        if (correctAnswer) {
          await queryQuestion.related('answer').create({ questionId: savedQuestions[index].id, choiceId: correctAnswer.id })
        }

        index++
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

  public async answer({ request, response }: HttpContextContract) {
    // const answer = request.body().answer
    // const choices = answer.map((answerChoice: any) => {
    //   return {
    //     choice: answerChoice.choice,
    //     question: answerChoice.questionId
    //   }
    // })

    // console.log(choices, 'choices')
    // const getQuiz = await Quiz.query().preload('question' , (q) => q.preload('choice'))


    return response.status(200)
  }

  public async update({ }: HttpContextContract) { }

  public async destroy({ response, params }: HttpContextContract) {
    // console.log(params.id, params, 'params') 
    const quiz = await Quiz.findOrFail(params.id)

    await quiz.delete()

    return response.status(200).json(quiz)
  }
}
