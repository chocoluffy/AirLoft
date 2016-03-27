angular.module("airloft", ['ngRoute']);

// config function: where we define the route.
function config ($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('airloft')
	.config(['$routeProvider', config]);
