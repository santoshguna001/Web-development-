var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

router.get('/analyze', middleware.isLoggedIn, function(req, res) {
    console.log(req.user._id);
    res.redirect('/user/' + req.user._id + '/analyze');
});

router.get('/:id/analyze', middleware.isLoggedIn, function(req, res) {
    res.render('users/analyze', { id: req.user._id });
});
router.post('/:id/analyze', middleware.isLoggedIn, function(req, res) {
    console.log(new Date(Date.now()));
    var spawn = require("child_process").spawn;
    if (!req.body.imageAnalysis) {
        req.body.imageAnalysis = 'False'
    }
    User.findByIdAndUpdate(req.user._id, {
        twitterid: req.body.twitterid,
        facebookid: req.body.facebookid,
        instagramid: req.body.instagramid,
        redditid: req.body.redditid,
        imageAnalysis: req.body.imageAnalysis
    }, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            user.save();
        }
    });
    var process = spawn('py', ["./scripts/index.py",
        req.user.username,
        req.body.facebookid,
        req.body.instagramid,
        req.body.redditid,
        req.body.twitterid,
        req.body.imageAnalysis
    ]);

    process.stdout.on('data', function(data) {
        console.log(new Date(Date.now()));
        let arr = data.toString().split("$");
        res.render('users/results', { lines: arr });
    })
});



module.exports = router;