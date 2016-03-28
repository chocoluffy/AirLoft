(function(){
	angular
		.module('airloft')
		.service('airloftData', airloftData);

	airloftData.$inject = ['$http'];
	function airloftData ($http){
		var missionByCoords = function(lat, lng){
			return $http.get('/api/missions?lng=' + lng + '&lat=' + lat + '&maxDistance=20000');
		};
		return {
			missionByCoords: missionByCoords
		};
	};
})();

	