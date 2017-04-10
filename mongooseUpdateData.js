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

//update 
var query = {name : {first : 'Buggy', last : 'Kim' }};
var options = {multi : true};
Kitten.update(query, { $set: { name: {first : 'Jake', last : 'Doggy'} }}, options, updatecallback);
function updatecallback(err,usr){
	if(err) return console.log(err);
	console.log(usr);
	console.log('updated ha ha ha');
	mongoose.connection.close(); // disconnect from mongodb
};

} // callback 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('disconnected');
});

