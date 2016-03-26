var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
	title: String,
	timeSlots: [String]
});

var reviewSchema = new mongoose.Schema({
	rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
	author: {type: String, required: true},
	createdOn: {type: Date, "default": Date.now},
	text: {type: String, required: true}
});

var timeSchema = new mongoose.Schema({
	timeslots: [String]
});

var contentSchema = new mongoose.Schema({
	tagname: String,
	tagdescript: String
})

var missionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	rating: {type: Number, "default": 0, min: 0, max: 5},
	author: {type: String, required: true},
	timeslots: [String],
	contentPanel: [contentSchema],
	coords: {type: [Number], index: '2dsphere', required: true},
	time: timeSchema,
	reviews: [reviewSchema]
});

mongoose.model('Mission', missionSchema);