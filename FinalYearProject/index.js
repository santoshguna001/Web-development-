var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalStrategy = require('passport-local-mongoose'),
    User = require('./models/user'),
    flash = require('connect-flash'),
    authRoutes = require('./routes/index'),
    userRoutes = require('./routes/user');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'Any random words',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.enable('trust proxy');

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var url = process.env.DATABASE || 'mongodb://localhost:27017/SoNA';
console.log(url);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


portNumber = process.env.PORT || 3000;
ipAddress = process.env.IP || '';

app.use('/', authRoutes);
app.use('/user', userRoutes);


app.listen(portNumber, ipAddress, function() {
    console.log('Web app listening for requests');
});