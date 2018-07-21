const path = require('path');

module.exports = {
    middleware: {
        'auth': path.resolve('./App/Middleware/AuthMiddleware.js'),

    },
}