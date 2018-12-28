const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ClassSchema = new Schema({
	course_type: {
		// Course Name: CS
		type: String,
		required: true
	},
	course_number: {
		// Course Number: 490
		type: String,
		required: true
	},
	title: {
		// Course Title: Senior Seminar
		type: String,
		required: true
	},
	section: {
		// Section Number: 01
		type: Number,
		required: true
	},
	schedule_number: {
		type: Number,
		required: true
	},
	units: {
		// Units: 1.0
		type: Number,
		required: true
	},
	days: {
		// Days: T
		type: [String],
		required: true
	},
	instructor: {
		// Instructor Name: S. Price
		type: String,
		required: true
	},
	semester: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	}
});

module.exports = User = mongoose.model("classes", ClassSchema);
