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



// Retreive whole data
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
  
}) 

// find 	 
// search result is JSON, not a mongodb document format
Kitten.find({name : {first : 'Jake', last : 'Doggy' }}).lean().exec(function(err,user){
   if (err) {
        console.log(err);
    } else {
        
        console.log('Found ha ha ha\n');
        console.log(user[0].name.first);
        mongoose.connection.close(); // disconnect from mongodb
      }
    })

} // callback-end

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('disconnected');
});

