import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/me', 'AuthController.__invoke')
}).namespace('App/Controllers/Http').middleware(['user'])