'use strict'

const Client = require('../../Models/').client;

module.exports = {

    async index(req, res) {
        if (!req.xhr) {
            return res.render('backend/index', { title: 'T3', csrfToken: req.csrfToken() });
        }

        const clients = await Client.all();

        res.status(200).json({clients: clients});
    },

    /**
     * create
     */
    async create(req, res) {
        const body = req.body;
        try {
            if (body.id != undefined) {
                return res.status(200).json({
                    message: `Client with id: ${body.id} has already been created.`,
                    task: body,
                });
            }
            const client = await Client.create({
                userId: req.user.id,
                name: body.name,
            });
    
            res.status(200).json({
                message: 'Client has been created!',
                client,
            });
        } 
        catch (err) {
            res.status(500).json({
                message: 'Client could not be created.',
                error: err,
            });
        }
    },

    /**
     * update
     */
    async update(req, res) {
        const body = req.body;
        try {
            if (body.id < 1) {
                return res.status(200).json({
                    message: `Invalid client id: ${body.id}.`,
                });
            }
    
            const client = await Client.find({
                where: {
                    id: body.id,
                    userId: req.user.id,
                }
            });

            await client.update({name: body.name});
            res.status(200).json({message: 'Client has been updated.'});

        } catch (err) {
            res.status(500).json({
                message: 'Task could not be updated.',
                error: err,
            });
        }
    },
}