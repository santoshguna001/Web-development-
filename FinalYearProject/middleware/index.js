var middlewareObj = {};
var User = require('../models/user');

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You need to login first!');
    res.redirect('/login');
}

middlewareObj.isSameUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, function(err, foundUser) {
            if (err) {
                res.redirect('back');
            } else {
                if (foundUser._id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have permission to do that!');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in first!');
        res.redirect('back');
    }
}

module.exports = middlewareObj;