(function (){
	angular.module("airloft", ['ngRoute', 'ui.bootstrap']);

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
			.when('/profile', {
				templateUrl: 'profile/profile.view.html',
				controller: 'profileCtrl',
				controllerAs: 'vm'
			})
			.when('/mission/:missionid', {
				templateUrl: "/missionDetail/missionDetail.view.html",
				controller: 'missionDetailCtrl',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: '/auth/register/register.view.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.when('/login', {
				templateUrl: '/auth/login/login.view.html',
				controller: 'loginCtrl',
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
	
