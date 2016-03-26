var request = require("request");

var apiOptions = {
	server: "http://localhost:3000"
}
// if(process.env.NODE_ENV == "production"){
// 	apiOptions.server = "https://frozen-ocean-17990.herokuapp.com";
// }

var _formatDistance = function(distance){
	var numDistance, unit
	if(distance > 1000 && distance <= 100* 1000){
		numDistance = parseFloat(distance / 1000).toFixed(1);
		unit = 'km';
	}else if(distance > 100 * 1000){
		numDistance = '> 100';
		unit = 'km';
	}
	else{
		numDistance = parseInt(distance, 10);
		unit = 'm';
	}
	return numDistance + unit;
};

var _collectTags = function(doc){
	var taglst = [];
	doc.forEach(function(pin){
		taglst.push(pin.tagname);
	})
	return taglst;
}

var renderHomePage = function(req, res, data){
	var message;
	if(!(data instanceof Array)){
		message = "API lookup error!";
		data = [];
	}else if(!data.length){
		message = "Found no match missions!"
	}
	console.log(data);
	res.render('missions-list', {
	 	title: 'AirLoft',
	 	subtitle: 'Explore available missions around you!',
	 	sidetext: 'Meet interesting people here and do great things! AirLoft helps you share your interests and habbits with the world',
	 	missions: data,
	 	message: message
	});
};

var renderSingleMission = function(req, res, data){
		res.render('mission-info', data);
};

var renderReview = function(req, res, data){
	var title = "Write review for ❝ " + data.name + " ❞";
	res.render('mission-review-form', {
		name: title,
		error: req.query.err
	});
};

var _showError = function(req, res, data){
	var title, content;
	if(data == 404){
		title = "404, page not found";
		content = "Oh dear, Looks like we can't find ths page. Sorry.";
	} else{
		title = data + ", something went wrong."
		content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(data);
	res.render("generic-text", {
		title: title,
		text: content
	})
};


module.exports.missionlist = function(req, res){
	res.render("missions-list", {
		title: "haha"
	})
};

var getMissionById = function(req, res, renderFn){
	var path = "/api/missions/" + req.params.missionid;
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {}
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 200){
			renderFn(req, res, body);
		}else{
			console.log(response.statusCode);
			_showError(req, res, response.statusCode);
		}
	})
};

module.exports.missioninfo = function(req, res){
	getMissionById(req, res, renderSingleMission);
};

module.exports.addReview = function(req, res){
	getMissionById(req, res, renderReview);
};

module.exports.postAddReview = function(req, res){
	var path = "/api/missions/" + req.params.missionid + "/reviews";
	if(!req.body.rating || !req.body.name || !req.body.review){
		res.redirect("/mission/" + req.params.missionid + "/review/new?err=val");
	}else{
		var requestOptions = {
			url: apiOptions.server + path,
			method: "POST",
			json: {
				rating: req.body.rating,
				author: req.body.name,
				text: req.body.review
			},
			qs: {}
		};
		request(requestOptions, function(err, response, body){
			if(response.statusCode == 201){
				res.redirect("/mission/" + req.params.missionid);
			}else if(response.statusCode == 400 && body.name == "ValidationError"){
				res.redirect("/mission/" + req.params.missionid + "/review/new?err=val");
			}else{
				console.log(response.statusCode);
				_showError(req, res, response.statusCode);
			}
		})	
	}
	
}