var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/YelpCamp", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String, 
	image: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/campgrounds', function(req, res){

	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log('Error');
		}
		res.render('index', {campgrounds: campgrounds});
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.post('/campgrounds', function(req, res){
	Campground.create(
		{
			name: req.body.name,
			image: req.body.image,
			description: req.body.description
		}, 
		function(err, campground){
			if(err){
				console.log(err);
			}else{
				res.redirect('campgrounds');
			}
		});
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id.trim(), function(err, campground){
		if(err){
			console.log('Error loading the given id' + req.params.id.trim());
		}else {
			res.render('show', {campground: campground});
		}
	});
});

app.listen(3000, function(){
	console.log('YelpCamp server has started listening');
});
