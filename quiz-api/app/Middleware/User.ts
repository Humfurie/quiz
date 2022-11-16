import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'

export default class User {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    request.headers
    // try {
    //   const token = request.headers['authorization'].split(" ")[1]

    //   if (!token) return response.status(401).json({ message: "Unauthorize Access!" })

    //   jwt.verify(token, process.env.APP_SECRET, (err, token) => {
    //     if (err) response.status(403).json({message: "token is not valid"})
    //     req
    //   })
    // } catch (error) {
    //   return response.status(401).json({ message: "Unauthorized Access!" })
    // }
    await next()
  }
}
