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