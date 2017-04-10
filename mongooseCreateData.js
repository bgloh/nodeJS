// node.js + mongoose

var mongoose = require('mongoose');
mongoose.connect('mongodb://bgloh2:loh4132@ds147069.mlab.com:47069/db1');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', function() {
	console.log("connected awesome !")
	callback();
});

function callback() {
	// With mongoose, everything is derived from a Schema
var kittySchema = mongoose.Schema({
	name : {first :String, last : String},
	age  : {type : Number, min : 0},
	sex  : String
});

// A model is a class with which we construct documents.
// In this case, each document will be a kitten with properites and behaviors as declared in our schema
var Kitten = mongoose.model('kitten', kittySchema);

// Create
var User = new Kitten({name : {first : 'Buggy', last : 'Kim'}, age : 2.5});


// Now, we have talking kittens ! But we still haven't saved anything tho MongoDB.
// Each document can be saved to the database by calling its save method.
// The first argument to the callback will eb an error if any occured.
User.save(function(err,User){
	if(err) return console.log(err);
	console.log("saved even more awesome");
	mongoose.connection.close(); // disconnect from mongodb
	}) 

} // callback 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('disconnected');
});

