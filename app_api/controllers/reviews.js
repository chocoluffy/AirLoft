var mongoose = require('mongoose');
var Missions = mongoose.model('Mission');
var User = mongoose.model('User');

var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

var addReiview = function(req, res, mission, author){
	mission.reviews.push({
		rating: req.body.rating,
		author: author,
		text: req.body.text
	})
	mission.save(function(err, mission){
		var thisReview;
		if(err){
			sendJsonRes(res, 400, err);
		}else{
			updateAveRating(mission._id);
			thisReview = mission.reviews[mission.reviews.length - 1];
			sendJsonRes(res, 201, thisReview);
		}
	})
}

var updateAveRating = function(missionid){
	Missions
		.findById(missionid)
		.select("rating reviews")
		.exec(function(err, mission){
			if(err){
				console.log(err);
			}else{
				doAveRating(mission);
			}
		})
};

var doAveRating = function(mission){
	var ratingCount = 0;
	var ratingNum = mission.reviews.length;
	mission.reviews.forEach(function(rev){
		ratingCount = ratingCount + rev.rating;
	});
	mission.rating = parseFloat(ratingCount / ratingNum);
	mission.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("average rating updated to", parseFloat(ratingCount / ratingNum));
		}
	})
}

module.exports.reviewsCreate = function(req, res){
	getAuthor(req, res, function(req, res, userName){
		if(req.params.missionid){
			Missions
				.findById(req.params.missionid)
				.select("reviews")
				.exec(function(err, mission){
					if(err){
						sendJsonRes(res, 404, err);
					}else{
						addReiview(req, res, mission, userName);
					}
				})
		}else{
			sendJsonRes(res, 404, {
				"message": "Found no missionid in params"
			})
		}
	});
};

var getAuthor = function(req, res, callback) {
  console.log("Finding author with email " + req.payload.email);
  if (req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

};

module.exports.reviewsReadOne = function(req, res){
	if(req.params && req.params.missionid && req.params.reviewid){
		Missions
			.findById(req.params.missionid)
			.select('name reviews')
			.exec(function(err, mission){
				if(!mission){
					sendJsonRes(res, 404, {
						"message": "missionid not found"
					})
					return;
				}else if(err){
					sendJsonRes(res, 404, err);
					return;
				}
				var response, review;
				review = mission.reviews.id(req.params.reviewid);
				if(!review){
					sendJsonRes(res, 404, {
						"message": "reviewid not found!"
					})
					return;
				}
				response = {
					mission: {
						name: mission.name,
						id: req.params.missionid
					},
					reviews: review
				};
				sendJsonRes(res, 200, response);
			});
	}else{
		sendJsonRes(res, 404, {
			"message": "No missionid or reviewid in request"
		})
	}

}

module.exports.reviewsUpdateOne = function(req, res){
	if(!req.params.missionid || !req.params.reviewid){
		sendJsonRes(res, 404, {
			"message": "Found no missionid or reviewid in request URL"
		});
		return;
	}
	Missions
		.findById(req.params.missionid)
		.select("reviews")
		.exec(function(err, mission){
			if(!mission){
				sendJsonRes(res, 404, {
					"message": "Found no match"
				})
			}
			else if(err){
				sendJsonRes(res, 404, err);
			}
			var thisReview = mission.reviews.id(req.params.reviewid);
			thisReview.rating = req.body.rating;
			thisReview.author = req.body.author;
			thisReview.text = req.body.author;
			mission.save(function(err, mission){
				if(err){
					sendJsonRes(res, 404, err);
					return;
				}
				sendJsonRes(res, 200, mission);
			});
		})
}

module.exports.reviewsDeleteOne = function(req, res){
	if(!req.params.missionid || !req.params.reviewid){
		sendJsonRes(res, 404, {
			"message": "Found no missionid or reviewid in request URL"
		});
		return;
	}
	Missions
		.findById(req.params.missionid)
		.select("reviews")
		.exec(function(err, mission){
			if(!mission){
				sendJsonRes(res, 404, {
					"message": "Found no match"
				});
				return;
			}
			else if(err){
				sendJsonRes(res, 404, err);
				return;
			}
			mission.reviews.id(req.params.reviewid).remove();
			mission.save(function(err, mission){
				if(err){
					sendJsonRes(res, 404, err);
					return;
				}
				updateAveRating(mission._id);
				sendJsonRes(res, 204, null);
			})
		})
}