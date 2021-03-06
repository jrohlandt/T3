'use strict'
const Task = require('../../Models/').tasks;
const DateHelper = require('../../Helpers/DateHelper.js');

module.exports = {

    /*
    * index
    */
    async index(req, res) {

        if (!req.xhr) {
            return res.render('backend/index', { title: 'T3', csrfToken: req.csrfToken() });
        }

        const Op = require('sequelize').Op;
        // Get last 10 days.
        const today = new Date();
        const date = new DateHelper;
        const minStartDate = date.toMysqlDate(new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000))) + ' 00:00:00';
        const tasks = await Task.all({
            where: {
                userId: req.user.id,
                startTime: {
                    [Op.gt]: minStartDate
                },
                endTime: {
                    [Op.gt]: '2018-01-01 00:00:00'
                }
            },
            order: [
                ['startTime', 'DESC'],
            ],
        });

        res.status(200).json({tasks: tasks});                
    },
    
    /**
     * getActiveTask
     */
    async getActiveTask(req, res) {
        console.log(req.session, 'req.xhr ACTIVETASK: ', req.xhr, req.headers);

        // Fetch only the last created started task.
        const tasks = await Task.all({
            where: {
                userId: req.user.id,
            },
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 1,
        });

        let task = tasks[0];
        if (taskIsActive(task)) {

            let started = true;
            if ( ! taskIsStarted(task) ) {
                task.startTime = 0;
                started = false;
            }

            res.status(200).json({task: task, started}); 
            return;       
        }

        res.status(200).json({message: 'There is no active task.'});
    },

    /**
     * create
     */
    async create(req, res) {
        const body = req.body;
        try {
            if (body.id != 0) {
                return res.status(200).json({
                    message: `Task with id: ${body.id} has already been created.`,
                    task: body,
                });
            }
            console.log('CREATE REQ USER: ', req.user);
            const task = await Task.create({
                userId: req.user.id,
                description: body.description,
                projectId: body.projectId,
                typeId: body.typeId,
                startTime: body.startTime,
            });
    
            res.status(200).json({
                message: 'Task has been created!',
                task: task,
            });
        } 
        catch (err) {
            res.status(500).json({
                message: 'Task could not be created.',
                error: err,
                task: body,
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
                    message: `Invalid task id: ${body.id}.`,
                    task: body,
                });
            }
    
            const task = await Task.find({
                where: {
                    id: body.id,
                    userId: req.user.id,
                }
            });
            await task.update({
                description: body.description,
                startTime: body.startTime,
                endTime: body.endTime,
                tzOffset: body.tzOffset,
                tzName: body.tzName,
                projectId: body.projectId,
                typeId: body.typeId,
            });
    
            res.status(200).json({
                message: 'Task has been updated!',
                task: task,
            });
        } catch (err) {
            res.status(500).json({
                message: 'Task could not be updated.',
                error: err,
                task: body,
            });
        }
    },

    /**
     * delete
     */
    async delete(req, res) {
        try {
            const task = await Task.find({
                where: {
                    id: req.query.id,
                    userId: req.user.id,
                }
            });
            await task.destroy();
    
            return res.status(200).json({
                message: 'Task has been deleted.',
            });
        } catch (err) {
            
            return res.status(500).json({
                message: 'Task could not be deleted.',
                error: err,
            });
        }
    }

};

function taskIsActive(task) {
    return new Date(task.startTime).getTime() == 0 || new Date(task.endTime).getTime() == 0;
}

function taskIsStarted(task) {
    return new Date(task.startTime).getTime() != 0;
}