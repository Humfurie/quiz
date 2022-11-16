import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/registration', 'UsersController.create')
    Route.post('/login', 'UsersController.login')
}).namespace('App/Controllers/Http')