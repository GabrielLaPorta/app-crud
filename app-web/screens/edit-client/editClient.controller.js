(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("EditClientsController", EditClientsController);

        EditClientsController.$inject = ["dataAppCrudService", "$state"];

        function EditClientsController(dataAppCrudService, $state) {
            const vm = this;

            vm.client.id = $state.params.id;
            vm.client.name = $state.params.name;
            vm.client.email = $state.params.email;
            vm.client.age = $state.params.age;

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
            
        }
})(window.angular);