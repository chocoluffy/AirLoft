angular.module('airloft', []);

var missionListCtrl = function($scope, airloftData){
	$scope.message = "Searching for nearby places...";
	airloftData
		.success(function(data){
			$scope.message = data.length > 0 ? "" : "No missions found nearby";	
			$scope.data = {
				missions: data
			};
		})
		.error(function(e){
			$scope.message = "Sorry, something's gone wrong.";
			console.log(e);
		});
};

var formatDistance = function(){
	return function(distance){
		var numDistance, unit
		if(distance > 1000 && distance <= 100* 1000){
			numDistance = parseFloat(distance / 1000).toFixed(1);
			unit = 'km';
		}else if(distance > 100 * 1000){
			numDistance = '> 100';
			unit = 'km';
		}
		else{
			numDistance = parseInt(distance, 10);
			unit = 'm';
		}
		return numDistance + unit;
	};
};

var ratingStars = function(){
	return {
		scope: {
			thisRating: "=rating"
		},
		templateUrl: '/angular/rating-stars.html'
	};
};

var airloftData = function($http){
	return $http.get('/api/missions?lng=-79.40014&lat=43.66469&maxDistance=20000');
};

var geolocation = function(){
	var getPosition = function(cbSuccess, cbError, cbNoGeo){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(cbSuccess, cbErrorb);
		}else{
			cbNoGeo();
		}
	};
	return {
		getPosition: getPosition
	};
};

angular
	.module('airloft')
	.controller('missionListCtrl', missionListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service("airloftData", airloftData);