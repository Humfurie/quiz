import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async __invoke({request, response}: HttpContextContract) {
   
    const user = await User.query().where({email: request.user.email}).first()

    return response.status(200).json(user)
  }

 
}
