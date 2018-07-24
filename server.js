'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // populates req.body otherwise it will be undefined.
const multer = require('multer');
const upload = multer(); // for parsing multipart/form-data
const conf = require('./.config.json');
const isDev = conf.APP_ENV === 'development';
const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Accept");
// });

// const expressSession = require('express-session');
// if (isDev) {
//     // Use FileStore in development.
//     const FileStore = require('session-file-store')(expressSession);
//     app.use(expressSession({
//         resave: false,
//         saveUninitialized: true,
//         secret: conf.APP_SECRET,
//         store: new FileStore(),
//     }));
// } else {
//     // Use RedisStore in production.
// }

app.use(morgan('dev'));
app.use(bodyParser.json()); // parse application/json content-type
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './resources/views');
app.use(express.static('public'));

app.get('/api', (req, res) => res.status(200).json('welcome to api'));
// const tasks = [{id: 1, description: 'Task 10'}, {id: 2, description: 'Task 2'}];

// Routes
require('./routes/web.js')(app);

app.listen(3000, () => console.log('Ready...'));


