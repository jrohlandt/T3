'use strict'

const Kernel = require('../Kernel.js');

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
        
        let m = [];
        for (let i=0; i < middleware.length; ++i) {
            if (Kernel.middleware[middleware[i]] != undefined) {
                let fn = require(Kernel.middleware[middleware[i]]);
                m.push(fn);
            }
        }
        
        this.app[httpMethod](
            route, 
            m, 
            this.catchErrors(this.getControllerMethod(controllerMethod))
        );
    }

    
}

module.exports = RouteHelper;