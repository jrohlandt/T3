'use strict'
module.exports = (app) => {

    const RouteHelper = require('../App/Helpers/RouteHelper.js');
    const Route = new RouteHelper(app);
    const MiddlewareHelper = require('../App/Helpers/MiddlewareHelper.js');

    app.use('/app', (req, res, next) => {
        MiddlewareHelper.runMiddleWare(req, res, next, ['auth']);
    });
    Route.get('/app', 'TaskController.index');
    Route.get('/app/tasks', 'TaskController.index');
    Route.get('/app/tasks/active', 'TaskController.getActiveTask');
    Route.post('/app/tasks', 'TaskController.create');
    Route.put('/app/tasks', 'TaskController.update');
    Route.delete('/app/tasks', 'TaskController.delete');

    const LoginController = require('../App/Controllers/Auth/LoginController.js');
    app.get('/login', Route.catchErrors(LoginController.login));
    app.post('/login', Route.catchErrors(LoginController.authenticate));
    app.get('/logout', Route.catchErrors(LoginController.logout));

}