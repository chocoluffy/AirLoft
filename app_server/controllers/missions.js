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
}

var renderHomePage = function(req, res, data){
	var message;
	if(!(data instanceof Array)){
		message = "API lookup error!";
		data = [];
	}else if(!data.length){
		message = "Found no match missions!"
	}
	res.render('missions-list', {
	 	title: 'AirLoft',
	 	subtitle: 'Explore available missions around you!',
	 	sidetext: 'Meet interesting people here and do great things! AirLoft helps you share your interests and habbits with the world',
	 	missions: data,
	 	message: message
	});
};

var renderSingleMission = function(req, res, data){
		var tags;
		for(var i=0; i<data.tag.length; i++){
			tags[i].tagname = data.tag[i];
		}

		res.render('mission-info', {
		name: data.name,
		rating: data.rating,
		author: data.author,
		timePanel:{
			title: data.timetitle||"Training time",
			timeslots: data.timeslots||[]
		},
		contentPanel: {
			title: 'materials',
			tags: [],
		},
		locationPanel: {
			title: 'Location Map',
			cords: data.coords
		},
		reviewPanel: {
			title: 'Peer Reviews',
			addReviewBtn: 'Add review',
			reviews: data.reviews
		}
	});
}

module.exports.missionlist = function(req, res){
	var path = "/api/missions";
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: 78.432332,
			lat: -41.23424,
			maxdistance: 5000
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
		if(err){
			console.log(err);
		}else if(response.statusCode == 200){
			console.log(body);
			renderSingleMission(req, res, body);
		}else{
			console.log(response.statusCode);
		}
	})
};

module.exports.addReview = function(req, res){
	res.render('mission-review-form', {
		name: 'Review Nodejs Ninja'
	});
};