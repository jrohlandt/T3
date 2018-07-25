'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // populates req.body otherwise it will be undefined.
const multer = require('multer');
const session = require('express-session');
const csrf = require('csurf');
const upload = multer(); // for parsing multipart/form-data
const conf = require('./.config.json');
const isDev = conf.APP_ENV === 'development';
const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Origin", "localhost:3000/app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Accept");
// });

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json content-type
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './resources/views');
app.use(express.static('public'));

if (isDev) {
    // Use FileStore in development.
    var SessionStore = require('session-file-store')(session);
    
} else {
    // Use RedisStore in production.
}

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: conf.APP_SECRET,
    store: new SessionStore(),
}));

app.use(csrf());


app.get('/api', (req, res) => res.status(200).json('welcome to api'));
// const tasks = [{id: 1, description: 'Task 10'}, {id: 2, description: 'Task 2'}];

// Routes
require('./routes/web.js')(app);

app.listen(3000, () => console.log('Ready...'));


