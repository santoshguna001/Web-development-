var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/reroute', middleware.isLoggedIn, function(req, res) {
    if (req.session.returnTo) {
        var url = req.session.returnTo;
        delete req.session.returnTo;
        return res.redirect(url);
    } else {
        res.redirect('landing');
    }
});

router.get('/landing', middleware.isLoggedIn, function(req, res) {
    res.render('landing');
});

router.get('/secret', middleware.isLoggedIn, function(req, res) {
    res.send('Another secret');
});

router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    console.log(req.body.username);
    User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            return res.redirect('register');
        } else {
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Welcome to SoNA, ' + user.username);
                res.redirect('landing');
            });
        }
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});
router.post('/login', passport.authenticate('local', {
        successFlash: 'Logged in Successfully!',
        failureFlash: 'Invalid Credentials!',
        successRedirect: '/reroute',
        failureRedirect: '/login'
    }),
    function(req, res) {});


router.get('/logout', function(req, res) {
    req.flash('success', 'Successfully logged you out!');
    req.logOut();
    res.redirect('/');
});


module.exports = router;