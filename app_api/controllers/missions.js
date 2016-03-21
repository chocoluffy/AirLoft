var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
}

module.exports.missionsListByDistance = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsCreate = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsReadOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsUpdateOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}

module.exports.missionsDeleteOne = function(req, res){
	sendJsonRes(res, 200, {"status": "success"});
}