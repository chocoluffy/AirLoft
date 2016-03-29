(function () {
  angular
    .module('airloft')
    .controller('missionDetailCtrl', missionDetailCtrl);

  missionDetailCtrl.$inject = ['$routeParams', '$uibModal', 'airloftData'];
  function missionDetailCtrl ($routeParams, $uibModal, airloftData) {
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
		var modalInstance = $uibModal.open({
			templateUrl: '/reviewModal/reviewModal.view.html',
			controller: 'reviewModalCtrl as vm',
			resolve: {
				missionData : function(){
					return {
						missionid: vm.missionid,
						missionName: vm.data.mission.name
					};
				}
			}
		})
	};
  }

})();