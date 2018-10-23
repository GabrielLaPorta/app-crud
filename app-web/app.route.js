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

            $urlRouterProvider.otherwise("/clients");

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
                    templateUrl: "screens/clients/clients-template.html",
                    url: "/clients?id&name&email&age"
                }).state("editClients", {
                    controller: "EditClientsController",
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
                    templateUrl: "screens/edit-client/edit-client-template.html",
                    url: "/editClients?id&name&email&age"
                });
        });
})(window.angular);