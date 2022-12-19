import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/answer', 'ExamineesController.create')
}).namespace('App/Controllers/Http')