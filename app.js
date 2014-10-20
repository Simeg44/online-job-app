var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var Applicant = require("./models/applicants.js");

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect("mongodb://localhost/fictionalLLC");

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err, results) {
		res.render('applicants', {
			applicants: results
		})

	})
});

// Deletes applicant
app.get("/delete/:lostApplicant", function(req, res){
	var id = req.params.lostApplicant;

	Applicant.remove({_id: id}, function(err, results){
		res.redirect("/applicants");
	});

});

// Goes to applicants personal page
app.get("/applicants/:userid", function(req, res) {
	// res.send(req.params);
	var id = req.params.userid;

	Applicant.findOne({_id: id}, function(err, results){
		res.render("personalPage", {
			applicant: results
		});
	});
})	

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body);
	var applicant = new Applicant(req.body);

	// Break skill entries into an array separted by ,
	var tempArray = applicant.skills[0].split(", ");
	applicant.skills = tempArray;

	applicant.save(function(err, result){

		res.redirect("applicants");
	});

});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
