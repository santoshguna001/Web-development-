var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	request = require('request');

var OAuth = require('oauth');
var header = {
    "X-Yahoo-App-Id": "app-id"
};

var request = new OAuth.OAuth(
    null,
    null,
    'consumer-key',
    'consumer-secret',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);

request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=bangalore,ca&format=json',
    null,
    null,
    (err, data, result) => {
        if (err) {
            console.log(err);
        } else {
        	var output = JSON.parse(data);
        	console.log('The wind properties at Bengaluru is ' + JSON.stringify(output['current_observation']['wind']));
        	console.log('The atmosphere properties at Bengaluru is ' + JSON.stringify(output['current_observation']['atmosphere']));
        	console.log('The astronomy properties at Bengaluru is ' + JSON.stringify(output['current_observation']['astronomy']));
        	console.log('The condition properties at Bengaluru is ' + JSON.stringify(output['current_observation']['condition']));
            //console.log(JSON.parse(data));
        }
    }
);

app.get('/', function(req, res){
	request('https://www.google.com', function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log(body);
		}else{
			console.log('Error! Something went wrong...');
		}
	});
});

app.listen(3000, function(){
	console.log('Server is listening');
});