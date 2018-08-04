'use strict'
module.exports = (app) => {

    const RouteHelper = require('../App/Helpers/RouteHelper.js');
    const Route = new RouteHelper(app);
    const MiddlewareHelper = require('../App/Helpers/MiddlewareHelper.js');

    // app
    app.use('/app', (req, res, next) => {
        MiddlewareHelper.runMiddleWare(req, res, next, ['auth']);
    });

    // app/tasks
    Route.get('/app', 'TaskController.index');
    Route.get('/app/tasks', 'TaskController.index');
    Route.get('/app/tasks/active', 'TaskController.getActiveTask');
    Route.post('/app/tasks', 'TaskController.create');
    Route.put('/app/tasks', 'TaskController.update');
    Route.delete('/app/tasks', 'TaskController.delete');

    // app/clients
    Route.get('/app/clients', 'ClientController.index');
    Route.post('/app/clients', 'ClientController.create');
    Route.put('/app/clients', 'ClientController.update');

    const AuthController = require('../App/Controllers/Auth/AuthController.js');
    app.get('/app/getAuthUser', Route.catchErrors(AuthController.getAuthUser));

    app.get('/login', Route.catchErrors(AuthController.login));
    app.post('/login', Route.catchErrors(AuthController.authenticate));
    app.get('/logout', Route.catchErrors(AuthController.logout));

}