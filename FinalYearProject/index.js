var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalStrategy = require('passport-local-mongoose'),
    User = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'Any random words',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var url = 'mongodb://localhost:27017/SoNA';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


portNumber = process.env.PORT || 3000;
ipAddress = process.env.IP || '';


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/landing', isLoggedIn, function(req, res) {
    res.render('landing');
});

app.get('/register', function(req, res) {
    res.render('register');
});
app.post('/register', function(req, res) {
    console.log(req.body.username);
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.render('landing');
            });
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login');
});
app.post('/login', passport.authenticate('local', {
    successRedirect: '/landing',
    failureRedirect: '/login'
}), function(req, res) {});


app.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/');
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.listen(portNumber, ipAddress, function() {
    console.log('Web app listening for requests');
});