var express = require('express'),
	app	= express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	expressSanitizer = require('express-sanitizer');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(expressSanitizer());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/restfulBlogApp", { useNewUrlParser: true, useUnifiedTopology: true});
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);


app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("Error\n", err);
		} else{
			res.render('index', {blogs: blogs});
		}
	});
})

app.get('/', function(req, res){
	res.redirect('/blogs');
})

app.get('/blogs/new', function(req, res){
	res.render('new');
});

app.post('/blogs', function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id.trim(), function(err, blog){
		if(err){
			res.redirect('/blogs');
		} else{
			res.render('show', {blog: blog});
		}
	});
});

app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id.trim(), function(err, blog){
		if(err){
			res.redirect('/blogs');
		} else{
			res.render('edit', {blog: blog});
		}
	});
});

app.put('/blogs/:id', function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect('/blogs');
		} else{
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

app.delete('/blogs/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/blogs');
		}else {
			res.redirect('/blogs');			
		}
	});
});

app.listen(3000, function(){
	console.log('Server is listening');
});