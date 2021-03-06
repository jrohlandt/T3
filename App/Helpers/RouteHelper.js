'use strict'

/**
 * The main purpose of this class is to wrap all route async methods in the catchErrors method, so you don't have to remember to 
 * wrap them manually each time.
 * 
 * The class also provides some conveniences like:
 * - Allowing you to send controller and method info like this 'Backend/TaskController.index', instead of having to require('../Controllers/Backend/TaskController.js').index
 * - Also you can pass in an array that contains the middleware names e.g. ['auth', 'something'] and then it will find the appropriate file in the App/Middleware dir.
 */
const MiddlewareHelper = require('./MiddlewareHelper.js');


class RouteHelper {
    constructor(app) {
        this.app = app;
        this.catchErrors = fn => (...args) => fn(...args).catch(args[2]);
    }

    /**
     * getControllerMethod 
     * @param {string} controllerAndMethod e.g. 'TaskController.index' 
     */
    getControllerMethod(controllerAndMethod) {
        const methodInfo = controllerAndMethod.split('.');
        return require(`../Controllers/Backend/${methodInfo[0]}.js`)[methodInfo[1]];
    }

    get(route, controllerMethod, middleware=[]) {
        this.makeRoute('get', route, controllerMethod, middleware);
    }

    post(route, controllerMethod, middleware=[]) {
        this.makeRoute('post', route, controllerMethod, middleware);
    }

    put(route, controllerMethod, middleware=[]) {
        this.makeRoute('put', route, controllerMethod, middleware);
    }

    delete(route, controllerMethod, middleware=[]) {
        this.makeRoute('delete', route, controllerMethod, middleware);
    }

    makeRoute(httpMethod, route, controllerMethod, middleware=[]) {
        this.app[httpMethod](
            route, 
            MiddlewareHelper.makeMiddlewareArray(middleware),
            this.catchErrors(this.getControllerMethod(controllerMethod))
        );
    }

    
}

module.exports = RouteHelper;