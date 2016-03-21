var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.reviewsCreate = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.reviewsReadOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.reviewsUpdateOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.reviewsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}