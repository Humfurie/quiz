import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import env from '@ioc:Adonis/Core/Env'

export default class User {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    try {
      const token = request.headers().authorization?.split(" ")[1]

      if (!token) return response.status(401).json({ message: "Unauthorize Access!" })

    const decode = jwt.verify(token, env.get('APP_SECRET'), {})

    console.log(decode)

    request.user = decode

    } catch (error) {
      return response.status(401).json({ message: "Unauthorized Access!" })
    }
    await next()
  }
}
