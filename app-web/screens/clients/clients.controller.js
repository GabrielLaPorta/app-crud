(angular => {
    "use strict"

    angular
        .module("appCrud")
        .controller("ClientsController", ClientsController);

        ClientsController.$inject = ["dataAppCrudService"];

        function ClientsController(dataAppCrudService) {
            const vm = this;

            
        }
})(window.angular);