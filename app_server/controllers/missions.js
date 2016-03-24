var request = require("request");

var apiOptions = {
	server: "http://localhost:3000"
}
// if(process.env.NODE_ENV == "production"){
// 	apiOptions.server = "https://frozen-ocean-17990.herokuapp.com";
// }

var renderHomePage = function(req, res){
	res.render('missions-list', {
	 	title: 'AirLoft',
	 	subtitle: 'Explore available missions around you!',
	 	sidetext: 'Meet interesting people here and do great things! AirLoft helps you share your interests and habbits with the world',
	 	missions: [
	 		{
	 			name: 'Nodejs Ninja',
	 			rating: 3,
	 			author: 'Shunzhe Yu',
	 			tags: ['Nodejs', 'Javascript', 'Mongodb']
	 		},
	 		{
	 			name: 'Reactjs Ninja',
	 			rating: 4,
	 			author: 'Shunzhe Yu',
	 			tags: ['Nodejs', 'Javascript', 'Mongodb']
	 		},
	 		{
	 			name: 'Database Ninja',
	 			rating: 5,
	 			author: 'Shunzhe Yu',
	 			tags: ['NoSQL', 'postgresql', 'Mongodb']
	 		}
	 	]
	});
};

module.exports.missionlist = function(req, res){
	var path = "/api/missions";
	var requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: 78.432323,
			lat: -41.23424,
			maxdistance: 200
		}
	};
	request(requestOptions, function(err, response, body){
		if(err){
			console.log(err);
		}else if(response.statusCode == 200){
			console.log(body);
		}else{
			console.log(response.statusCode);
		}
	})
	renderHomePage(req, res);
};

module.exports.missioninfo = function(req, res){

	var path = "/api/missions/56f300da505a72842ef8ee94";
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
		}else{
			console.log(response.statusCode);
		}
	})



	res.render('mission-info', {
		name: 'Nodejs Ninja',
		rating: 4,
		author: 'Shunzhe Yu',
		timePanel:{
			title: 'Training Time',
			timeslots: ['March 15 - March 17: 7:00 am - 7:00 pm', 
			'March 21 - March 23: 7:00 am - 7:00 pm'
			]
		},
		contentPanel: {
			title: 'materials',
			tags: [{
				tagname: 'Nodejs',
				tagdescript: '12 practical hand-on Nodejs projects'
			},
			{
				tagname: 'Javascript',
				tagdescript: 'Learning Javascript in 7 days'
			},
			{
				tagname: 'Mongodb',
				tagdescript: 'Using mongodb to store data'
			}]
		},
		locationPanel: {
			title: 'Location Map',
			cords: ['43.666257', '-79.391198']
		},
		reviewPanel: {
			title: 'Peer Reviews',
			addReviewBtn: 'Add review',
			reviews: [{
				rating: 4,
				author: 'Shunzhe Yu',
				timestamp: '12 March 2016',
				text: 'What a great training course! It is the best node tutorial I ever had. I hope that this website can be known by more people, and meet more like-minded people! Again, thanks!!'
			},
			{
				rating: 5,
				author: 'Monkey D Luffy',
				timestamp: '14 March 2016',
				text: 'What a great training course! One thing I did notice is that tutors are really patient and are willing to teach us a lot of useful techiniques that can be easily applied to our own projects! Thanks!'
			}]
		}
	});
};

module.exports.addReview = function(req, res){
	res.render('mission-review-form', {
		name: 'Review Nodejs Ninja'
	});
};