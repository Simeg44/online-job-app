var mongoose = require("mongoose");

var Applicant = mongoose.Schema({
	name: String,
	bio: String,
	skills: [String],
	years: Number,
	reason: String
})

module.exports = mongoose.model("applicant", Applicant);