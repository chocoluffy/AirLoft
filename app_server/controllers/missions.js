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
}


module.exports.missionlist = function(req, res){
	var path = "/api/missions";
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: -79.40021,
			lat: 43.664697,
			maxdistance: 500000
		}
	};
	request(requestOptions, function(err, response, body){
		if(err){
			console.log(err);
		}else if(response.statusCode == 200){
			var i, data;
			data = body;
			for(i=0; i<body.length; i++){
				data[i].distance = _formatDistance(data[i].distance);
				data[i].tags = _collectTags(data[i].contentPanel);
			}
			renderHomePage(req, res, data);
		}else{
			console.log(response.statusCode);
		}
	})
};

module.exports.missioninfo = function(req, res){
	// var path = "/api/missions/56f300da505a72842ef8ee94";
	var path = "/api/missions/" + req.params.missionid;
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {}
	};
	request(requestOptions, function(err, response, body){
		if(response.statusCode == 200){
			renderSingleMission(req, res, body);
		}else{
			console.log(response.statusCode);
			_showError(req, res, response.statusCode);
		}
	})
};

module.exports.addReview = function(req, res){
	res.render('mission-review-form', {
		name: 'Review Nodejs Ninja'
	});
};