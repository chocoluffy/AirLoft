angular.module('airloft', []);

var missionListCtrl = function($scope){
	$scope.data{
		missions: [{
			name: 'one piece',
			rating: 2,
			distance: "233",
			author: "hah",
			tags: ["ga"],
		}]
	}
};

angular
	.module('airloft')
	.controller('missionListCtrl', missionListCtrl);