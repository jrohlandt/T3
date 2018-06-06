'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // populates req.body otherwise it will be undefined.
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json content-type
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

app.use(express.static('public'));
app.get('/api', (req, res) => res.status(200).json('welcome to api'));
// const tasks = [{id: 1, description: 'Task 10'}, {id: 2, description: 'Task 2'}];


// INDEX/LIST
app.get('/api/tasks', async (req, res) => {
    const Tasks = require('./app/models/').tasks;
    try {
        const tasks = await Tasks.all();
        res.status(200).json({tasks: tasks})                
    } catch (err) {
        console.log(err);
    }

});

// CREATE
app.post('/api/tasks', async (req, res) => {
    const Tasks = require('./app/models/').tasks;

    try {
        const body = req.body;
        if (body.id !== 0) {
            return res.status(200).json({
                message: `Task with id: ${body.id} has already been created.`,
                task: body,
            });
        }
        const task = await Tasks.create({
            description: body.description
        });

        res.status(200).json({
            message: 'Task has been created!',
            task: task,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Task could not be created.',
            error: err,
            task: body,
        });
    }
    // console.log('post task: ', req.body);
    // res.status(200).json({message: 'server create task'});
});


// UPDATE
app.put('/api/tasks', async (req, res) => {
    const Tasks = require('./app/models/').tasks;

    try {
        const body = req.body;
        if (body.id < 1) {
            return res.status(200).json({
                message: `Task with id: ${body.id} has already been created.`,
                task: body,
            });
        }

        const task = await Tasks.findById(body.id);
        await task.update({
            description: body.description,
            startTime: body.startTime,
            endTime: body.endTime,
            tzOffset: body.tzOffset,
            tzName: body.tzName
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
    // console.log('post task: ', req.body);
    // res.status(200).json({message: 'server create task'});
});

app.listen(3000, () => console.log('Ready...'));


