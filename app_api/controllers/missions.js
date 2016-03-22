var mongoose = require('mongoose');
var Missions = mongoose.model('Mission');

var theEarth = (function(){
  var earthRadius = 6371;
  var getDistanceFromRads = function(rads){
    return parseFloat(earthRadius * rads);
  }
  var getRadsFromDistance = function(distance){
    return parseFloat(distance/earthRadius);
  }
  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  }
})();

// for main page listing by distance.
var resToList = function(results){
	var lst = [];
	results.forEach(function(doc){
		lst.push({
				distance: theEarth.getDistanceFromRads(doc.dis),
				name: doc.obj.name,
				author: doc.obj.author,
				rating: doc.obj.rating,
				tags: doc.obj.tag,
				_id: doc.obj._id
		})
	})
	return lst;
};

var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.missionsListByDistance = function(req, res){
	if(req.query.lng && req.query.lat){
		var lng = parseFloat(req.query.lng);
		var lat = parseFloat(req.query.lat);
		var point = {
			type: "Point",
			coordinates: [lng, lat]
		};
		var geoOptions = {
			spherical: true,
			maxDistance: theEarth.getRadsFromDistance(parseInt(req.query.maxdistance||2000)),
			num: 10,
		};
		// console.log(geoOptions.maxDistance);
		Missions.geoNear(point, geoOptions, function(err, results, stats){
			if(err){
				sendJsonRes(res, 404, err);
				return ;
			}
			sendJsonRes(res, 200, resToList(results));
		});
	}
	else {
		sendJsonRes(res, 404, {
			"message": "Found no longtitue or lattitude in query string."
		});
		return;
	}
}

module.exports.missionsCreate = function(req, res){
	Missions.create({
		name: req.body.name,
		rating: req.body.rating,
		tag: req.body.tags.split(","),
		author: req.body.author,
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		timepanel: {
			title: req.body.timetitle,
			timeslots: req.body.timeslots.split(",")
		}
	}, function(err, mission){
		if(err){
			sendJsonRes(res, 404, err);
		}else{
			sendJsonRes(res, 201, mission);
		}
	})
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
	if(!req.params.missionid){
		sendJsonRes(res, 404, {
			"message": "Found no missionid in request URL."
		});
		return;
	}
	Missions
		.findById(req.params.missionid)
		.exec(function(err, mission){
			if(err){
				sendJsonRes(res, 404, {
					"message": "Found no mission match."
				});
				return;
			}
			mission.name = req.body.name;
			mission.rating = req.body.rating;
			mission.author = req.body.author;
			mission.tag = req.body.tags.split(",");
			mission.coords = [req.body.lng, req.body.lat];
			mission.save(function(err, mission){
				if(err){
					sendJsonRes(res, 404, err);
				}else{
					sendJsonRes(res, 200, mission);
				}
			})
		})
}

module.exports.missionsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}