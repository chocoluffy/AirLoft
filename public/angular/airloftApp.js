angular.module('airloft', []);

var missionListCtrl = function($scope, airloftData, geolocation){
	$scope.message = "Checking your location...";

	$scope.getData = function(position){
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		console.log(position);
		$scope.message = "Searching for nearby missions...";
		airloftData.missionByCoords(lat, lng)
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

	$scope.showError = function(error){
		$scope.$apply(function(){
			$scope.message = error.message;
		});
	};

	$scope.noGeo = function(){
		$scope.$apply(function(){
			$scope.message = "Geolocation not supported by this browser.";
		});
	};

	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
			
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
	var missionByCoords = function(lat, lng){
		return $http.get('/api/missions?lng=' + lng + '&lat=' + lat + '&maxDistance=2000000');
	};
	return {
		missionByCoords: missionByCoords
	};
};

var geolocation = function(){
	var getPosition = function(cbSuccess, cbError, cbNoGeo){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
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
	.service("airloftData", airloftData)
	.service("geolocation", geolocation);