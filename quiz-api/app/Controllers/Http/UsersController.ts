import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import jwt from 'jsonwebtoken'
import env from '@ioc:Adonis/Core/Env'
import hash from 'Config/hash'

export default class UsersController {
  public async index({ }: HttpContextContract) { }

  public async create({ request, response }: HttpContextContract) {
    const validated = await request.validate(UserValidator)
    await User.create({
      fullname: validated.fullname,
      email: validated.email,
      password: validated.password
    })

    const user = await User.query().where('email', validated.email).first()
    const tokenAuth = {
      email: validated.email
    }

    if (!user) {
      return response.status(401).json({ message: 'Unauthorized User!' })
    }

    if (!await Hash.verify(user.password, validated.password)) {
      return response.status(401).json({ message: 'Unauthorized User!' })
    }

    try {
      const token = jwt.sign(tokenAuth, env.get('APP_SECRET'), { espiresIn: "30 mins" })
      let jwtCookie = `JWT=${token}; Domain=${"localhost"};`

      if (request.input('remember')) {
        jwtCookie = `${jwtCookie} Max-Age=31536000;`
      }
      return response.status(200).send({
        token: token,
        data: { ...user }
      })
    } catch {
      return response.redirect().back()
    }
  }

  public async login({ request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.query().where('email', email).first()

    const tokenAuth = {
      email: user?.email
    }

    if (!user) {
      return response.status(401).json({ message: 'user not found' })
    }

    if (!await Hash.verify(user.password, password)) {
      const token = jwt.sign(tokenAuth, env.get('App_Secret'), { expiresIn: "30 mins" })
      let jwtCookie = `JWT=${token}; Domain=${"localhost"}`

      if (request.input('remember')) {
        jwtCookie = `${jwtCookie} Max-Age=361560000`
      }
      return response.status(200).send({
        token: token,
        data: { ...user }
      })
    }
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
