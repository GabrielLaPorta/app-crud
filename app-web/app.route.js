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

            // $urlRouterProvider.otherwise("/clients");

            $stateProvider
                .state("clients", {
                    controller: "ClientsController",
                    controllerAs: "vm",
                    params: {
                        id: {
                            dynamic: true
                        }
                    },
                    templateUrl: "screens/create-clients/clients-template.html",
                    url: "/clients"
                }).state("editClients", {
                    controller: "EditClientsController",
                    controllerAs: "vm",
                    params: {
                        id: {
                            dynamic: true
                        }
                    },
                    templateUrl: "screens/edit-client/edit-client-template.html",
                    url: "/clients/:id"
                })
                .state("classes", {
                    controller: "ClassesController",
                    controllerAs: "vm",
                    params: {
                        id: {
                            dynamic: true
                        }
                    },
                    templateUrl: "screens/create-classes/classes-template.html",
                    url: "/classes"
                })
        });
})(window.angular);