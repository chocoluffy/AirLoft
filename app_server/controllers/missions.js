module.exports.missionlist = function(req, res){
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

module.exports.missioninfo = function(req, res){
	res.render('mission-info', {title: 'Missions details'});
};

module.exports.addReview = function(req, res){
	res.render('mission-review-form', {title: 'Add review'});
};