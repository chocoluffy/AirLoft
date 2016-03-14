var mongoose = require('mongoose');
var missionSchema = new mongoose.Schema({
	name: {type: String, required: true},
	rating: {type: Number, "default": 0, min: 0, max: 5},
	author: String,
	tag: [String],
	coords: {type: [Number], index: '2dsphere'}
});