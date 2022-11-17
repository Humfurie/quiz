import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/registration', 'UsersController.create')
    Route.post('/login', 'UsersController.login')
    Route.get('/auth', 'UsersController.invoke').middleware(['user'])
}).namespace('App/Controllers/Http')