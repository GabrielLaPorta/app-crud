(angular => {
    "use strict";

    angular
        .module("route", ["ui.router", "templates"])
        .config((
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            $urlMatcherFactoryProvider
        ) => {
            $locationProvider.html5Mode(true);

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $urlRouterProvider.otherwise("/app/clients");

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
                    templateUrl: "../app-web/screens/clients/clients-template.html",
                    url: "/app/clients?id&name&email&age"
                });
        });
})(window.angular);