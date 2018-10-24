(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("ClientsController", ClientsController);

        ClientsController.$inject = ["dataAppCrudService", "$state"];

        function ClientsController(dataAppCrudService, $state) {
            const vm = this;

            vm.editClientAreaOpened = false;

            getAllClients();

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

            vm.createClient = () => {
                dataAppCrudService
                    .clientResource()
                    .create(vm.client)
                    .$promise
                    .then(response => {
                        $state.reload();
                        console.log(`Client ${response.name} created`);
                    }).catch(error => {
                        console.error(error);
                    });
            };

            vm.openCreateClientArea = () => {
                vm.editClientAreaOpened = !vm.editClientAreaOpened;
            };

            vm.editClientPageGo = (client) => {
                $state.go("editClients", {id: client.id});
            };

            vm.deleteClient = (client) => {
                dataAppCrudService
                    .clientResource()
                    .delete(client)
                    .$promise
                    .then(response => {
                        $state.reload();
                        console.log(`Client ${response.name} deleted`);
                    }).catch(error => {
                        console.error(error);
                    });
            };            
        }
})(window.angular);