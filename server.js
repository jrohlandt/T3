'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // populates req.body otherwise it will be undefined.
const multer = require('multer');
const session = require('express-session');
const csrf = require('csurf');
const passport = require('passport');
const upload = multer(); // for parsing multipart/form-data
const conf = require('./.config.json');
const isDev = conf.APP_ENV === 'development';
const app = express();

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
    cookie: { 
        maxAge: 3600000, // Expire every hour. Just testing how session expires handling is working out (On frontend I'm just listening for invalid csrf 403).
        httpOnly: true,
    }, 
}));

app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => res.status(200).json('welcome to api'));

// Routes
require('./routes/web.js')(app);

app.listen(3000, () => console.log('Ready...'));


