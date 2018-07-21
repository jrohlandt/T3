'use strict'

const MiddlewareHelper = require('./MiddlewareHelper.js');


class RouteHelper {
    constructor(app) {
        this.app = app;
        this.catchErrors = fn => (...args) => fn(...args).catch(args[2]);
    }

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