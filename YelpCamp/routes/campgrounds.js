var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

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
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});



//new - show form to create a new campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.create({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
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

//edit campground route
router.get('/:id/edit', middleware.campgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render('campgrounds/edit', { campground: foundCampground });
    });
});

//update campground route
router.put('/:id', middleware.campgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundCampground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//Destroy campground route
router.delete('/:id', middleware.campgroundOwnership, function(req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
});
module.exports = router;