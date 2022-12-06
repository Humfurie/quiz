import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/quiz', 'QuizzesController.store')
    Route.get('/main', 'QuizzesController.show')
    Route.delete('/delete/:id', 'QuizzesController.destroy')
}).namespace('App/Controllers/Http')