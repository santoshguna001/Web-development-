var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');


router.get('/:id/analyze', middleware.isLoggedIn, function(req, res) {
    res.render('users/analyze', { id: req.user._id });
});
router.post('/:id/analyze', middleware.isLoggedIn, function(req, res) {
    var spawn = require("child_process").spawn;
    console.log(req.body);
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
            console.log(user)
        }
    });
    var process = spawn('python', ["./scripts/index.py",
        req.user.username,
        req.body.facebookid,
        req.body.instagramid,
        req.body.redditid,
        req.body.twitterid,
        req.body.imageAnalysis
    ]);

    process.stdout.on('data', function(data) {
        res.send(data.toString());
    })
});
router.post('/', middleware.isLoggedIn, function(req, res) {
    res.send('Fine');
});

router.get('/analyze', function(req, res) {
    console.log(req.user._id);
    res.redirect('/user/' + req.user._id + '/analyze');
});


module.exports = router;