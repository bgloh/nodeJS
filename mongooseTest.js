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
var Kitten = mongoose.model('kitten2', kittySchema);

// Create
var User = new Kitten({name : {first : 'Byoung8', last : 'Loh'}, age : 18});

// Kittens can meow, so let's take a look at how to add 'speak' functionality to our documents
// methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = "new method";
  console.log(greeting);
}


// Now, we have talking kittens ! But we still haven't saved anything tho MongoDB.
// Each document can be saved to the database by calling its save method.
// The first argument to the callback will eb an error if any occured.
/*User.save(function(err,User){
	if(err) return console.log(err);
	console.log("saved");
	}) */

// Retreive
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
  
}) 

//update 
var query = {name : {first : 'Byoung7', last : 'Loh' }};
var options = {multi : true};
Kitten.update(query, { $set: { name: {first : 'Brian', last : 'Roh'} }}, options, updatecallback);
function updatecallback(err,usr){
	if(err) return console.log(err);
	console.log(usr);
	console.log('updated ha ha ha');
	//mongoose.connection.close(); // disconnect from mongodb
}


// find 	 
/*Kitten.find({name : {first : 'Byoung8', last : 'Loh' }}, function (err, user) {  
    if (err) {
        console.log(err);
    } else {
        // send the list of all people in database with name of "John James" and age of 36
        // Very possible this will be an array with just one Person object in it.
        //users.name = 'Roh';
        console.log('Found ha ha ha')
        console.log(user);
        mongoose.connection.close(); // disconnect from mongodb
        
    }
}); */

} // callback 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('disconnected');
});

