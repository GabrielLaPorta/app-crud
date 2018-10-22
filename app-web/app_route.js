(angular => {
    "use strict";

    angular
        .module("route", ["ui.router"])
        .config((
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            $urlMatcherFactoryProvider
        ) => {
            $locationProvider.html5Mode(true);

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $urlRouterProvider.otherwise("http://localhost:3000/clients");

            $stateProvider
                .state("clients", {
                    controller: "ClientsController",
                    controllerAs: "vm",
                    params: {
                        id: {
                            dynamic: true
                        },
                        name: {
                            dynamic: true
                        },
                        email: {
                            dynamic: true
                        },
                        age: {
                            dynamic: true
                        }
                    },
                    templateUrl: "../clients-template.html",
                    url: "http://localhost:3000/clients"
                });
        });
})(window.angular);