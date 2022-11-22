import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/quiz', 'QuizzesController.store')
}).namespace('App/Controllers/Http')