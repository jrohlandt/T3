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

app.get('/api/tasks', async (req, res) => {
    const Tasks = require('./app/models/').tasks;
    try {
        const tasks = await Tasks.all();
        res.status(200).json({tasks: tasks})                
    } catch (err) {
        console.log(err);
    }

});

app.post('/api/tasks', async (req, res) => {
    console.log('post task: ', req.body);
    res.status(200).json({message: 'create task'});
});

app.listen(3000, () => console.log('Ready...'));


