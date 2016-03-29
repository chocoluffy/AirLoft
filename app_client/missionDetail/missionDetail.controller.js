(function () {
  angular
    .module('airloft')
    .controller('missionDetailCtrl', missionDetailCtrl);

  missionDetailCtrl.$inject = ['$routeParams', 'airloftData'];
  function missionDetailCtrl ($routeParams, airloftData) {
    var vm = this;
    vm.missionid = $routeParams.missionid;

    airloftData.missionById(vm.missionid)
    	.success(function(data) {
	        vm.data = { mission: data };
	        // console.log(vm.data);
	        vm.pageHeader = {
	          title: vm.data.mission.name,
	          strapline: vm.data.mission.author
	        };
	    })
	    .error(function (e) {
	        console.log(e);
	    });

	vm.popupReviewForm = function(){
		console.log("button");
	};
  }

})();