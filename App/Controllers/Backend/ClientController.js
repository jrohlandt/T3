'use strict'

const Client = require('../../Models/').client;

module.exports = {

    async index(req, res) {
        if (!req.xhr) {
            return res.render('backend/index', { title: 'T3', csrfToken: req.csrfToken() });
        }

        const clients = await Client.all();

        res.status(200).json({clients: clients});
    }
}