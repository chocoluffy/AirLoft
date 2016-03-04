module.exports.homelist = function(req, res){
	res.render('locations-list', {title: 'Home'});
};

module.exports.locationInfo = function(){
	res.render('index', {title: 'location details'});
};

module.exports.addReview = function(){
	res.render('index', {title: 'Review'});
};