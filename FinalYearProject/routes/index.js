var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/reroute', middleware.isLoggedIn, function(req, res) {
    req.flash('success', 'Logged in successfully!');
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
    res.render('secret');
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

router.get('/reset', function(req, res) {
    res.render('reset', { sent: false, validate: false, message: '' });
});
router.post('/reset', function(req, res) {
    User.find({ email: req.body.email }, function(err, user) {
        if (err) {
            res.render('reset', { sent: false, validate: false, message: 'Database Connectivity error!' });
        } else {
            if (user.length == 0) {
                res.render('reset', { sent: false, validate: false, message: 'No such email registered!' });
            } else {
                const nodemailer = require('nodemailer');
                let fromMail = 'santoshgunashekar@gmail.com';
                let toMail = req.body.email;
                let subject = 'SoNA password reset OTP';
                let preText = 'One Time Password(OTP) is ';
                req.session.OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

                let text = preText + String(req.session.OTP) + '.';
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'santoshgunashekar@gmail.com',
                        pass: process.env.PASSWORD
                    }
                });
                let mailOptions = {
                    from: fromMail,
                    to: toMail,
                    subject: subject,
                    text: text
                };
                transporter.sendMail(mailOptions, (error, response) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log(response)
                });
                res.render('reset', { sent: true, validate: false, error: false });
            }
        }
    });
});

router.post('/resetGetOTP', function(req, res) {
    if (req.body.number == req.session.OTP) {
        res.render('reset', { sent: true, validate: true });
    } else {
        res.render('reset', { sent: true, validate: false, error: true });
    }
});

router.post('/resetPassword', function(req, res) {
    delete req.session.returnTo;
    res.send('Password Changed');
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