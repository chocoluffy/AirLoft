angular.module("airloft", ['ngRoute']);

function config ($routeProvider){
	$routeProvider
		.when('/', {})
		.otherwise({redirectTo: '/'});
}

angular.
	.module('airloft')
	.config(['$routeProvider', config]);
