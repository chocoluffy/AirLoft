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
			.when('/about', {
				templateUrl: 'common/views/genericText.view.html',
				controller: 'aboutCtrl',
				controllerAs: 'vm'
			})
			.when('/mission/:missionid', {
				templateUrl: "/missionDetail/missionDetail.view.html",
				controller: 'missionDetailCtrl',
				controllerAs: 'vm'
			})
			.otherwise({redirectTo: '/'});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}

	angular
		.module('airloft')
		.config(['$routeProvider', '$locationProvider', config]);
})();
	
