'use strict'

module.exports = {

    async index(req, res) {
        if (!req.xhr) {
            return res.render('backend/index', { title: 'T3', csrfToken: req.csrfToken() });
        }
    }
}