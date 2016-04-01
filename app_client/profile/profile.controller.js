(function () {

  angular
    .module('airloft')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['authentication'];
  function profileCtrl(authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Profile'
    };
    vm.currentUser = authentication.currentUser();
    console.log(vm.currentUser);
    vm.main = {
      content: vm.currentUser.name
    };
  }

})();