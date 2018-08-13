'use strict'

const Project = require('../../Models/').project;

module.exports = {

    async index(req, res) {
        if (!req.xhr) {
            return res.render('backend/index', { title: 'T3', csrfToken: req.csrfToken() });
        }

        const projects = await Project.all();

        res.status(200).json({projects});
    },

    /**
     * create
     */
    async create(req, res) {
        const body = req.body;
        try {
            if (body.id != undefined) {
                return res.status(200).json({
                    message: `Project with id: ${body.id} has already been created.`,
                    task: body,
                });
            }
            const project = await Project.create({
                userId: req.user.id,
                name: body.name,
                clientId: body.clientId,
                colorId: body.colorId,
            });
    
            res.status(200).json({
                message: 'Project has been created!',
                project,
            });
        } 
        catch (err) {
            res.status(500).json({
                message: 'Project could not be created.',
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
                    message: `Invalid project id: ${body.id}.`,
                });
            }
    
            const project = await Project.find({
                where: {
                    id: body.id,
                    userId: req.user.id,
                }
            });

            await project.update({
                name: body.name,
                clientId: body.clientId,
                colorId: body.colorId,
            });
            res.status(200).json({message: 'Project has been updated.'});

        } catch (err) {
            res.status(500).json({
                message: 'Project could not be updated.',
                error: err,
            });
        }
    },

    /**
     * delete
     */
    async delete(req, res) {
        try {
            const project = await Project.find({
                where: {
                    id: req.query.id,
                    userId: req.user.id,
                }
            });
            await project.destroy();
    
            return res.status(200).json({
                message: 'Project has been deleted.',
            });
        } catch (err) {
            
            return res.status(500).json({
                message: 'Project could not be deleted.',
                error: err,
            });
        }
    }
}