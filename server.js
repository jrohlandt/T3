'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use(express.static('public'));
app.get('/api', (req, res) => res.status(200).json('welcome to api'));

app.listen(3000, () => console.log('Ready...'));


