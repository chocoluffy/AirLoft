var mongoose = require('mongoose');
var Missions = mongoose.model('Mission');


var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.missionsListByDistance = function(req, res){
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var point = {
		type: "point",
		coordinates: [lng, lat]
	};
	Missions.geonear(point, options, callback);
}

module.exports.missionsCreate = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsReadOne = function(req, res){
	if(req.params && req.params.missionid){
		Missions
			.findById(req.params.missionid)
			.exec(function(err, mission){
				if(!mission){
					sendJsonRes(res, 404, {
						"message": "Missionid not found!"
					});
					return;
				}
				else if(err){
					sendJsonRes(res, 404, err);
					return;
				}
				sendJsonRes(res, 200, mission);
				console.log("success retrieve mission info!");
			})
	}else{
		sendJsonRes(res, 404, {
			"message": "No missionid in the request params!"
		});
	}
};

module.exports.missionsUpdateOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}