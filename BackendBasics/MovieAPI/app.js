const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require("request");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
	res.render('search');
});


app.get('/results', function(req, res){
	request('http://www.omdbapi.com/?s=' + req.query.movieName + '&apikey=thewdb', function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body); 	
		}
		res.render('results.ejs', {data: data});
	});
});

app.listen(3000, () => {
	console.log('Server is listening ...');
});