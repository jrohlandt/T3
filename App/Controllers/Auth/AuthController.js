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

		passport.authenticate('local', function(err, user, info) {
			console.log('local : ', user);
			if (err) {
				return next(err);
			}

			if (!user) { 
				return res.status(401).json({message: 'Authentication failed'}); 
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
	},

	async getAuthUser(req, res) {
		
		if (req.user) {
			const user = req.user;

			return res.status(200).json({
				user: {
					id: user.id,
					firstName: user.firstName,
					email: user.email,
				}
			});
		}
		
		return res.status(401).json({message: 'User is not authenticated.'});
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
		console.log('local strategy: ', email, password);
		const user = await User.find({where: { email: email }});

		if (!user)
			return done(null, false);
		
		if (await checkPassword(password, user.password)) 
			return done(null, user);

		return done(null, false);
}));

const checkPassword = (p1, p2) => {
	const bcrypt = require('bcrypt');
	return new Promise((resolve, reject) => {
	  bcrypt.compare(p1, p2, function (error, isMatch) {
		if (error) {
		  return reject(error);
		}
		return isMatch ? resolve(true) : resolve(false);
	  })
	})
  }