var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

//Index route - show all campgrounds
router.get('/', function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log('Error');
        }
        res.render('campgrounds/index', { campgrounds: campgrounds });
    });
});

//create - add new campground to database
router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});



//new - show form to create a new campground
router.post('/', isLoggedIn, function(req, res) {
    Campground.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            author: {
                username: req.user.username,
                id: req.user._id
            }
        },
        function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('campgrounds');
            }
        });
});


//show - show more info about one campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id.trim()).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log('Error loading the given id' + req.params.id.trim());
        } else {
            res.render('campgrounds/show', { campground: campground });
        }
    });
});

module.exports = router;