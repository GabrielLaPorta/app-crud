(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("EditClientsController", EditClientsController);

        EditClientsController.$inject = ["dataAppCrudService", "$state"];

        function EditClientsController(dataAppCrudService, $state) {
            const vm = this;
            
            const clientId = $state.params.id;
            
            vm.editAddressAreaOpened = false;

            getClient();

            function getClient() {
                dataAppCrudService
                    .clientResource()
                    .get({id: clientId})
                    .$promise
                    .then(response => {
                        vm.client = response;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };

            vm.updateClient = () => {
                dataAppCrudService
                    .clientResource()
                    .update(vm.client)
                    .$promise
                    .then(response => {
                        $state.go("clients");
                        console.log(`Client ${response.name}`);
                    }).catch(error => {
                        console.error(error);
                    });
            };

            vm.openCreateAddressArea = () => {
                vm.editAddressAreaOpened = !vm.editAddressAreaOpened;
                vm.address = {
                    action: "insert",
                    client_id: clientId
                };
            };

            vm.saveAddress = () => {
                dataAppCrudService
                    .addressResource()[getSaveAddressAction()](vm.address)
                    .$promise
                    .then(response => {
                        $state.reload();
                        console.log(`Address ${response.address}`);
                    }).catch(error => {
                        console.error(error);
                    });
            };

            vm.openEditAddressArea = (address) => {
                vm.editAddressAreaOpened = true;
                vm.address = angular.copy(address);
                vm.address.action = "update";
            };

            vm.deleteAddress = (address) => {
                dataAppCrudService
                .addressResource()
                .delete(address)
                .$promise
                .then(response => {
                    $state.reload();
                    console.log(`Address ${response.address} deleted`);
                }).catch(error => {
                    console.error(error);
                });
            };

            function getSaveAddressAction() {
                return vm.address.action === "insert" ? "create" : "update";
            }

        }
})(window.angular);