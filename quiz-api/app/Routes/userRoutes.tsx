import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/registration', 'UsersController.create')
}).namespace('App/Controllers/Http')