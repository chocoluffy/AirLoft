(function () {

  angular
    .module('airloft')
    .controller('missionModalCtrl', missionModalCtrl);

  missionModalCtrl.$inject = ['$uibModal'];
  function missionModalCtrl ($uibModal) {
    var vm = this;
    // vm.missionData = missionData;

    vm.onSubmit = function () {
      alert("submit!"); 
      // vm.formError = "";
      // if (!vm.formData.rating || !vm.formData.reviewText) {
      //   vm.formError = "All fields required, please try again";
      //   return false;
      // } else {
      //   vm.doAddReview(vm.missionData.missionid, vm.formData);
      // }
    };

    // vm.doAddReview = function (missionid, formData) {
    //   airloftData.addReviewById(missionid, {
    //     author: formData.name,
    //     rating : formData.rating,
    //     text : formData.reviewText
    //   })
    //     .success(function (data) {
    //       vm.modal.close(data);
    //     })
    //     .error(function (data) {
    //       vm.formError = "Your review has not been saved, please try again";
    //     });
    //   return false;
    // };

    // vm.modal = {
    //   close : function (result) {
    //     $uibModalInstance.close(result);
    //   },
    //   cancel : function () {
    //     $uibModalInstance.dismiss('cancel');
    //   }
    // };

  }

})();