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
                if(vm.editClientAreaOpened === false){
                vm.editClientAreaOpened = true;
                }
                else{
                    vm.editClientAreaOpened = false;
                }
            };

            vm.editClientPageGo = (client) => {
                $state.params.id = client.id;
                $state.params.name = client.name;
                $state.params.email = client.email;
                $state.params.age = client.age;
                $state.go("editClients", );
            };            
        }
})(window.angular);