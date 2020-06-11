var express = require('express');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({extended: true}));
var friends = ['Tony', 'Kane', 'Steve', 'Lily'];
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('home');
});

app.get('/friends', function(req, res){
	res.render('friends', {friends: friends});
});

app.post('/addFriend', function(req, res){
	friends.push(req.body.friendName);
	res.redirect('/friends');
});

app.listen(3000, function(){
	console.log('Server is listening');
})