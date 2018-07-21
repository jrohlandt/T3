'use strict'
const Kernel = require('../Kernel.js');

module.exports = {
    runMiddleWare: (req, res, next, middleware) => {
        
        for (let i=0; i < middleware.length; ++i) {
            if (Kernel.middleware[middleware[i]] != undefined) {
                let fn = require(Kernel.middleware[middleware[i]]);
                fn(req, res, next);
            }
        }
    },


    makeMiddlewareArray: (middlewareNames) => {
        let m = [];
        for (let i=0; i < middlewareNames.length; ++i) {
            if (Kernel.middleware[middlewareNames[i]] != undefined) {
                let fn = require(Kernel.middleware[middlewareNames[i]]);
                m.push(fn);
            }
        }

        return m;
    }

}