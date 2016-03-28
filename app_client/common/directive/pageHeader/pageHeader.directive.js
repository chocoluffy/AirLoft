(function () {
  angular
    .module('airloft')
    .directive('pageHeader', pageHeader);
	
	function pageHeader () {
		return {
			restrict: 'EA',
			scope: {
			content : '=content'
			},
	
	 	templateUrl: '/common/directive/pageHeader/pageHeader.template.html'
		};
	} 
})();
