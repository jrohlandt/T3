const express = require('express');
const router = express.Router();
const User = require('../../Models/').user;

// const multer = require('multer')
// const singleImageUpload = multer({ dest: './uploads' }).single('image')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const email = require('../../helpers/email')

// var userModel = require('../../models/user');

module.exports = {
    async login(req, res) {
        // console.log('Request: ', req.session);
	    return res.render('auth/login', { title: 'T3 - Sign in', csrfToken: req.csrfToken() });    
	},
	
	async logout(req, res) {
		req.logout();
		res.redirect('/login');
	},

	async authenticate(req, res, next) {

		// console.log('login: ', req.body); 
		// return;
		// req.checkBody('email', 'Please enter a valid email address').isEmail();
		// req.checkBody('password', 'Please enter a password').notEmpty();

		// if (req.validationErrors()) {
		// 	req.flash('success', 'You have been logged outa here');
		// 	return res.redirect('/auth/login'); 
		// } else {
			passport.authenticate('local', function(err, user, info) {
				if (err) {
					return next(err);
				}

				if (!user) { 
					return res.status(404).json({message: 'Authentication failed'}); 
				}

				try {
					req.logIn(user, function(err) {
						if (err) { 
							return next(err); 
						}
						return res.status(200).json({message: 'Success! logged in.'});
					});
				} catch (err) {
					console.log('req.logIn: ', err);
				}
				
			})(req, res, next);
		// }
	}
}

passport.serializeUser(function (user, done) {
	console.log('serialize user');
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

	console.log('deserialize user:', id);

	const user = await User.find({where: {id: id}});
	if (user) {
		done(null, user);
	}
});

passport.use(
	new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, 
	async (email, password, done) => {

		const user = await User.find({where: { email: email }});
		console.log('login user: ', user);
		user ? done(null, user) : done(null, false);

	// userModel.findByEmail(email)
	// 	.then(user => {
	// 		if (!user) {
	// 			done(null, false);
	// 		} else {
	// 			userModel.checkPassword(password, user.password)
	// 				.then(isMatch => {
	// 					isMatch === true ? done(null, user) : done(null, false);
	// 				})
	// 				.catch(error => {
	// 					console.log(error);
	// 					done(null, false);
	// 				});
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});
}));
