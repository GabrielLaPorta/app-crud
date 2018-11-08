(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("ClassesController", ClassesController);

    ClassesController.$inject = ["dataAppCrudService", "$state"];

    function ClassesController(dataAppCrudService, $state) {
        const vm = this;

        vm.editClassAreaOpened = false;

        getAllClasses();


        vm.saveClass = () => {
            dataAppCrudService
                .classResource()[getSaveClassAction()](vm.class)
                .$promise
                .then(response => {
                    getAllClasses();
                    vm.editClassAreaOpened = false;
                    console.log(`Class ${response.name_class}`);
                }).catch(error => {
                    console.error(error);
                });
        };

        vm.deleteClass = (cls) => {
            const message = confirm("Do you want to delete this class?");
            cls.id = cls.id.toString();

            if (message) {
                dataAppCrudService
                    .classResource()
                    .delete({
                        id: cls.id
                    })
                    .$promise
                    .then(response => {
                        getAllClasses();
                    }).catch(error => {
                        console.error(error);
                    });
            }
        };

        vm.openCreateClassArea = () => {
            getAllClasses();
            vm.editClassAreaOpened = !vm.editClassAreaOpened;
            vm.class = {
                action: "insert"
            };
        };

        vm.openEditClassArea = (cls) => {
            vm.editClassAreaOpened = true;
            vm.class = angular.copy(cls);
            vm.class.action = "update";
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
        };

        function getSaveClassAction() {
            return vm.class.action === "insert" ? "create" : "update";
        }

    }
})(window.angular);