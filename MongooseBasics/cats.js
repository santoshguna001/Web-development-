var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_db", { useNewUrlParser: true, useUnifiedTopology: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

// var George = new Cat({
// 	name: "George",
// 	age: 11,
// 	temperament: 'Grouchy'
// });
// George.save(function(err, cat){
// 	if(err){
// 		console.log('Something went wrong!!!');
// 		console.log(err);
// 	} else{
// 		console.log('Added a cat to the database');
// 		console.log(cat);
// 	}
// });

//Use either the above one or below one to add entries to the database

// George.create({name:'something',  age:20, temperament: 'Bland'}, function(err, cat){
// 	if(err){
// 		console.log('Something went wrong!!!');
// 		console.log(err);
// 	} else{
// 		console.log('Added a cat to the database');
// 		console.log(cat);
// 	}
// });

Cat.find({}, function(err, cats){
	if(err){
		console.log("ERROR");
		console.log(err);
	} else {
		console.log("All the cats");
		console.log(cats);
	}
});