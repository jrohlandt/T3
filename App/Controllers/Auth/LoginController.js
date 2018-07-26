const express = require('express');
const router = express.Router();

// const multer = require('multer')
// const singleImageUpload = multer({ dest: './uploads' }).single('image')

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const email = require('../../helpers/email')

// var userModel = require('../../models/user');

module.exports = {
    async login(req, res) {
        // console.log('Request: ', req.session);
	    return res.render('auth/login', { title: 'T3 - Sign in', csrfToken: req.csrfToken() });    
    }
}

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You have logged out');
	res.redirect('/auth/login');
});