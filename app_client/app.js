(function (){
	angular.module("airloft", ['ngRoute']);

	// config function: where we define the route.
	function config ($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			enabled: true
		}});
	}

	angular
		.module('airloft')
		.config(['$routeProvider', '$locationProvider', config]);
})();
	
