module.exports = function(req, res, next) {

    // return next(); // ignore auth for now.

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');

}