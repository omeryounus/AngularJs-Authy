(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$http', '$location', 'AuthenticationService', 'MessageService','UserService'];
    function LoginController($scope, $http, $location, AuthenticationService, MessageService, UserService) {
        var vm = this;

        $scope.setType = function () {
            $scope.type = "softTouch";
        }

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.email, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.email, vm.password);

                    UserService.GetByEmail(vm.email)
                        .then(function (user) {

                    if($scope.type==="softTouch"){

                      $http.post('/softToken',{email:email, password: password, authy: user.authy})
                          .success(function (response) {
                              $location.path('/2fa');
                          })
                          .error(function (err) {
                              vm.dataLoading = false;
                              MessageService.Error(err.message, false);
                              $location.path('/login');
                          });
                    }
                    else {
                        $http.post('/login', {email: email, password: password, authy: user.authy})
                            .success(function (response) {
                                $location.path('/');
                            })
                            .error(function (err) {
                                $location.path('/login');
                            });
                    }
                        });
                } else {
                    MessageService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();