var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    // User = require('/models/user'),
    seedDB = require('./seeds');

seedDB();
mongoose.connect("mongodb://localhost:27017/YelpCamp", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {

    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log('Error');
        }
        res.render('campgrounds/index', { campgrounds: campgrounds });
    });
});

app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new');
});

app.post('/campgrounds', function(req, res) {
    Campground.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description
        },
        function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('campgrounds');
            }
        });
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id.trim()).populate('comments').exec(function(err, campground) {
        if (err) {
            console.log('Error loading the given id' + req.params.id.trim());
        } else {
            console.log(campground);
            res.render('campgrounds/show', { campground: campground });
        }
    });
});
app.get('/campgrounds/:id/comments/new', function(req, res) {
    Campground.findById(req.params.id.trim(), function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', { campground: campground });
        }
    });
});
app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id.trim(), function(err, campground) {
        if (err) {
            console.log(err);
            redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

app.listen(3000, function() {
    console.log('YelpCamp server has started listening');
});