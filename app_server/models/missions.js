var mongoose = require('mongoose');
var missionSchema = new mongoose.Schema({
	name: String,
	rating: {type: Number, "default": 0},
	author: String,
	tag: [String]
});