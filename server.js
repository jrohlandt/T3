'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.static('public'));
app.get('/api', (req, res) => res.status(200).json('welcome to api'));
const tasks = [{id: 1, description: 'Task 10'}, {id: 2, description: 'Task 2'}];
app.get('/api/tasks', (req, res) => res.status(200).json({tasks: tasks}));

app.listen(3000, () => console.log('Ready...'));


