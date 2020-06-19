var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');


//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


//Comments new 
router.get('/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id.trim(), function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});

//Comments create
router.post('/', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id.trim(), function(err, campground) {
        if (err) {
            console.log(err);
            redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author = { username: req.user.username, id: req.user._id };
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

module.exports = router;