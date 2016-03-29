(function(){
	angular
		.module('airloft')
		.service('airloftData', airloftData);

	airloftData.$inject = ['$http'];

	function airloftData ($http){
		var missionByCoords = function(lat, lng){
			return $http.get('/api/missions?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
		};

		var missionById = function(missionid){
			return $http.get('/api/missions/' + missionid);
		};

		var addReviewById = function(missionid, data){
			console.log(data);
			return $http.post('/api/missions/' + missionid + '/reviews', data);
		}

		return {
			missionByCoords: missionByCoords,
			missionById: missionById,
			addReviewById: addReviewById
		};
	};
})();

	