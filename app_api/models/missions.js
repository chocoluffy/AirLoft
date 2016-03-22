var mongoose = require('mongoose');

var timeSchema = new mongoose.Schema({
	title: String,
	timeSlots: [String]
});

var reviewSchema = new mongoose.Schema({
	rating: {type: Number, "default": 0, min: 0, max: 5},
	author: String,
	createdOn: {type: Date, "default": Date.now},
	text: String
});

var missionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	rating: {type: Number, "default": 0, min: 0, max: 5},
	author: String,
	tag: [String],
	coords: {type: [Number], index: '2dsphere', required: true},
	time: timeSchema,
	reviews: [reviewSchema]
});

mongoose.model('Mission', missionSchema);