angular.module('airloft', []);

var missionListCtrl = function($scope){
	$scope.data = {
		missions: [{
			name: 'one piece',
			rating: 2,
			distance: "233",
			author: "hah",
			tags: ["ga"],
		}]
	}
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
}

angular
	.module('airloft')
	.controller('missionListCtrl', missionListCtrl)
	.filter('formatDistance', formatDistance);