module.exports.missionlist = function(req, res){
	res.render('missions-list', {title: 'Home'});
};

module.exports.missioninfo = function(req, res){
	res.render('mission-info', {title: 'Missions details'});
};

module.exports.addReview = function(req, res){
	res.render('mission-review-form', {title: 'Add review'});
};