var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/user'),
    seedDB = require('./seeds'),
    methodOveride = require('method-override'),
    flash = require('connect-flash');

//Requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    authRoutes = require('./routes/index');



//seedDB(); //seed the database

var url = process.env.DATABASEURL || 'mongodb://localhost:27017/YelpCamp'
var portNumber = process.env.PORT || 3000
var IPAddress = process.env.IP || ''
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(methodOveride('_method'));
app.use(flash());

app.use(require('express-session')({
    secret: 'This is my secret key',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', authRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);


app.listen(portNumber, IPAddress, function(){
    console.log('YelpCamp server has started listening');
});