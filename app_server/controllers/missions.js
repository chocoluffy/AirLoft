module.exports.missionlist = function(req, res){
	res.render('missions-list', {title: 'Home'});
};

module.exports.missioninfo = function(req, res){
	res.render('index', {title: 'missions details'});
};

module.exports.addReview = function(req, res){
	res.render('index', {title: 'Review'});
};