(function(){
	angular
		.module('airloft')
		.service('airloftData', airloftData);

	airloftData.$inject = ['$http', 'authentication'];

	function airloftData ($http, authentication){
		var missionByCoords = function(lat, lng){
			return $http.get('/api/missions?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
		};

		var missionById = function(missionid){
			return $http.get('/api/missions/' + missionid);
		};

		var addReviewById = function(missionid, data){
			console.log(data);
			return $http.post('/api/missions/' + missionid + '/reviews', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		}

		return {
			missionByCoords: missionByCoords,
			missionById: missionById,
			addReviewById: addReviewById
		};
	};
})();

	