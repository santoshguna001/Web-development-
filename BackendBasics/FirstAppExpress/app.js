var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hi there, welcome to my assignment');
});

app.get('/speak/:animal', function(req, res){
	var animal = req.params.animal;
	var speak = '';
	if(animal == 'pig'){
		speak = 'Oink';
	}else if(animal == 'cow'){
		speak = 'Moo';
	}else if(animal == 'dog'){
		speak = 'Woof Woof!';
	}
	res.send('The ' + req.params.animal + ' says \'' + speak + '\'');
});

app.get('/repeat/:string/:number', function(req, res){
	var n = req.params.number;
	var word = req.params.string;
	var output = '';
	for(var i = 0; i < n; i++){
		output = output + word + ' ';
	}
	res.send(output.trim());
});

app.get('*', function(req, res){
	res.send('Sorry, page not found...What are you doing with your life?');
});

app.listen(3000, function(){
	console.log('Server running');
});