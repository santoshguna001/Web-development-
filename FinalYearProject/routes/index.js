var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');
var async = require("async");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
const Storage = require('../models/resetFile');
router.get('/', function(req, res) {
    res.render('landing');
});

router.get('/reroute', middleware.isLoggedIn, function(req, res) {
    req.flash('success', 'Logged in successfully!');
    if (req.session.returnTo) {
        var url = req.session.returnTo;
        delete req.session.returnTo;
        return res.redirect(url);
    } else {
        res.redirect('/home');
    }
});

router.get('/home', middleware.isLoggedIn, function(req, res) {
    res.render('home');
});

router.get('/settings', middleware.isLoggedIn, function(req, res) {
    res.render('settings');
});

router.get('/secret', middleware.isLoggedIn, function(req, res) {
    res.render('secret');
});

router.get('/register', function(req, res) {
    res.render('register');
});
router.post('/register', function(req, res) {
    User.find({ email: req.body.email }, function(err, user) {
        if (user) {
            console.log(user);
            req.flash('error', 'This email is already registered, Try signing in, instead!');
            return res.redirect('/register');
        } else {
            User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    req.flash('error', err.message);
                    return res.redirect('register');
                } else {
                    passport.authenticate('local')(req, res, function() {
                        req.flash('success', 'Welcome to SoNA, ' + user.username);
                        res.redirect('home');
                    });
                }
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
router.get('/forgot/:type', function(req, res) {
    res.render('forgot', { type: req.params.type });
});


router.post('/forgot/:type', function(req, res, next) {
    async.waterfall([
        function(done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot/username');
                }
                if (req.params.type == 'username') {
                    req.flash('success', 'Your username is ' + user.username);
                    return res.redirect('/login');
                }
                user.OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                user.save(function(err) {
                    done(err, user);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'santoshgunashekar@gmail.com',
                    pass: process.env.PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'santoshgunashekar@gmail.com',
                subject: 'SoNA Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please ignore this email and your password will remain unchanged.\nYour One Time Password(OTP) is ' +
                    user.OTP
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                Storage.addBlock(user._id, user);
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                return res.redirect('/verify/' + user._id);
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot/password');
    });
});

router.get('/verify/:id', function(req, res) {
    res.render('verify', { id: req.params.id });
});

router.post('/verify/:id', function(req, res) {
    async.waterfall([
        function(done) {
            if (req.body.otp == Storage.getBlock(req.params.id).OTP) {
                Storage.delBlock(req.params.id);
                req.flash('success', 'OTP Verified!');
                return res.redirect('/reset/' + req.params.id);
            } else {
                req.flash("error", "OTP is incorrect!");
                return res.redirect('back');
            }
        }
    ], function(err) {
        res.redirect('/home');
    });
});
router.get('/reset/:id', function(req, res) {
    res.render('reset', { id: req.params.id, task: 'reset' });
});

router.post('/reset/:id', function(req, res) {
    async.waterfall([
        function(done) {
            User.findById(req.params.id, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function(err) {

                        user.save(function(err) {
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'santoshgunashekar@gmail.com',
                    pass: process.env.PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'santoshgunashekar@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function(err) {
        console.log(err);
        res.redirect('/');
    });
});


router.get('/change', middleware.isLoggedIn, function(req, res) {
    currentUser = req.user;
    res.render('reset', { task: 'change' });
});

router.post('/change', function(req, res) {
    async.waterfall([
        function(done) {
            User.findById(currentUser._id, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function(err) {

                        user.save(function(err) {
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
                    })
                } else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'santoshgunashekar@gmail.com',
                    pass: process.env.PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'santoshgunashekar@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function(err) {
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;