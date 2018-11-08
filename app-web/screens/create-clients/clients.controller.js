(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("ClientsController", ClientsController);

        ClientsController.$inject = ["dataAppCrudService", "$state", "$interval"];

        function ClientsController(dataAppCrudService, $state, $interval) {
            const vm = this;

            vm.createClientAreaOpened = false;
            vm.reverse = "reverse";

            getAllClients();

            vm.createClient = () => {
                dataAppCrudService
                .clientResource()
                    .create(vm.client)
                    .$promise
                    .then(response => {
                        getAllClients();
                        vm.createClientAreaOpened = false;
                    }).catch(error => {
                        console.error(error);
                    });
            };

            vm.openCreateClientArea = () => {
                vm.createClientAreaOpened = !vm.createClientAreaOpened;
            };
            
            vm.editClientPageGo = (client) => {
            $state.go("editClients", {id: client.id});
            };

            vm.getField = (col) => {
                vm.reverse = !vm.reverse;
                vm.colName = col;
            };
            
            function getAllClients() {
                dataAppCrudService
                    .clientResource()
                    .getAll()
                    .$promise
                    .then(response => {
                        vm.clients = response;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };

        }
    })(window.angular);