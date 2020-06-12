var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
					{name: 'Peru', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.epcoUWl2HYeEIYKxYcLhUwHaE8%26pid%3DApi&f=1'},
					{name: 'Himalayas', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9rMnzKhvqdB1IfWyDgrh1AHaEo%26pid%3DApi&f=1'},
					{name: 'Kenya', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.QSfKf930r8DLh460ko1NQgHaDt%26pid%3DApi&f=1'},
					{name: 'Kilimanjaro', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdwdads.files.wordpress.com%2F2013%2F10%2Fcampsites-at-fort-wilderness-resort-topc-g00.jpg&f=1&nofb=1'},
					{name: 'Agou', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F08%2F99%2Fc4%2F84%2F10-shady-lovely-campsites.jpg&f=1&nofb=1'},
					{name: 'Peru', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.epcoUWl2HYeEIYKxYcLhUwHaE8%26pid%3DApi&f=1'},
					{name: 'Himalayas', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9rMnzKhvqdB1IfWyDgrh1AHaEo%26pid%3DApi&f=1'},
					{name: 'Kenya', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.QSfKf930r8DLh460ko1NQgHaDt%26pid%3DApi&f=1'},
					{name: 'Kilimanjaro', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdwdads.files.wordpress.com%2F2013%2F10%2Fcampsites-at-fort-wilderness-resort-topc-g00.jpg&f=1&nofb=1'},
					{name: 'Agou', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F08%2F99%2Fc4%2F84%2F10-shady-lovely-campsites.jpg&f=1&nofb=1'}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/campgrounds', function(req, res){
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.post('/campgrounds', function(req, res){
	campgrounds.push({name: req.body.name, image: req.body.image})
	res.redirect('campgrounds');
});

app.listen(3000, function(){
	console.log('YelpCamp server has started listening');
});
