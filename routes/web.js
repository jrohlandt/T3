module.exports = (app) => {

    const RouteHelper = require('../App/Helpers/RouteHelper.js');
    const Route = new RouteHelper(app);

    Route.get('/tasks', 'TaskController.index', ['auth']);
    Route.get('/tasks/active', 'TaskController.getActiveTask', ['auth']);
    Route.post('/tasks', 'TaskController.create', ['auth']);
    Route.put('/tasks', 'TaskController.update', ['auth']);
    Route.delete('/tasks', 'TaskController.delete', ['auth']);

}