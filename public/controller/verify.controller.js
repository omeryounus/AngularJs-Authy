(function () {
    'use strict';

    angular
        .module('app')
        .controller('VerifyController', VerifyController);

    VerifyController.$inject = ['$http', '$location', 'AuthenticationService', 'MessageService'];
    function VerifyController($http, $location, AuthenticationService, MessageService) {
        var vm = this;
        vm.verify = verify;

        (function initController() {
            // reset login status
        })();

        function verify() {
            vm.dataLoading = true;
            $http.post('/verify', { token: vm.token})
                .success(function (response) {
                    $location.path('/');
                })
                .error(function (err){
                    MessageService.Error("There is error with your verification code, try again later!", false);
                    vm.dataLoading = false;

                })
        };
    }
})();