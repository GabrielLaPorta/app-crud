(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("EditClientsController", EditClientsController);

    EditClientsController.$inject = ["dataAppCrudService", "$state"];

    function EditClientsController(dataAppCrudService, $state) {
        const vm = this;

        const clientId = $state.params.id;

        vm.editClientAreaOpened = false;
        vm.editAddressAreaOpened = false;
        vm.editClientAreaOpened = false;
        vm.color;

        getClient();
        getAllClasses();

        function getColor() {
            vm.color = "class-color-row ";
        }

        vm.updateClient = () => {
            vm.client.classList = vm.classList;

            dataAppCrudService
                .clientResource()
                .update(vm.client)
                .$promise
                .then(response => {
                    getClient();
                    vm.editClientAreaOpened = false;
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
                    getClient();
                    vm.color = "";
                    vm.editAddressAreaOpened = false;
                }).catch(error => {
                    console.error(error);
                });
        };

        vm.openEditAddressArea = (address) => {
            vm.editAddressAreaOpened = true;
            vm.address = angular.copy(address);
            vm.address.action = "update";
            getColor();
        };

        vm.deleteClient = () => {
            const message = confirm("Do you want to delete this client?");

            if (message) {
                dataAppCrudService
                    .clientResource()
                    .delete({
                        id: clientId
                    })
                    .$promise
                    .then(response => {
                        $state.go("clients");
                    }).catch(error => {
                        console.error(error);
                    });
            }
        };

        vm.deleteAddress = (address) => {
            const message = confirm("Do you want to delete this address?");

            if (message) {
                dataAppCrudService
                    .addressResource()
                    .delete(address)
                    .$promise
                    .then(response => {
                        getClient();
                    }).catch(error => {
                        console.error(error);
                    });
            }
        };

        vm.openEditClientArea = () => {
            vm.editClientAreaOpened = !vm.editClientAreaOpened;
        };

        function getClient() {
            dataAppCrudService
                .clientResource()
                .get({
                    id: clientId
                })
                .$promise
                .then(response => {
                    vm.client = response;
                    vm.classList = response.classes_id
                })
                .catch(error => {
                    console.error(error);
                });
        };

        function getAllClasses() {
            dataAppCrudService
                .classResource()
                .getAll()
                .$promise
                .then(response => {
                    vm.classes = response;
                })
                .catch(error => {
                    console.error(error);
                });
        }

        function getSaveAddressAction() {
            return vm.address.action === "insert" ? "create" : "update";
        }

    }
})(window.angular);