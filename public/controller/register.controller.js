(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$http','$location', '$rootScope', 'MessageService'];
    function RegisterController(UserService, $http, $location, $rootScope, MessageService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;

            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        $http.post('/register', { email: vm.user.email, phone_number: vm.user.phonenumber, country_code: vm.user.countrycode})
                            .success(function (response) {
                                vm.user.authy= response.authy;
                                UserService.Update(vm.user)
                                MessageService.Success('Registration successful', true);
                                    $location.path('/login');
                                    vm.dataLoading = false;
                            })
                    .error(function(err){
                        MessageService.Success('Registration failed' + err, true);

                    });
                    } else {
                        MessageService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();