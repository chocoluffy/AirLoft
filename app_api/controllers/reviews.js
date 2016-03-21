var mongoose = require('mongoose');
var Missions = mongoose.model('Mission')

var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.reviewsCreate = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.reviewsReadOne = function(req, res){
	Missions
		.findById(req.params.missionid)
		.select('name reviews')
		.exec(function(err, mission){
			var response, review;
			review = mission.reviews.id(req.params.reviewid);
			response = {
				mission: {
					name: mission.name,
					id: req.params.missionid
				},
				reviews: review
			};
			sendJsonRes(res, 200, response);
		});
}

module.exports.reviewsUpdateOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.reviewsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}