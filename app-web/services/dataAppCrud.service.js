(angular => {
    "use strict"

    angular
        .module("appCrud")
        .factory("dataAppCrudService", dataAppCrudService);

    dataAppCrudService.$inject = ["$resource"];

    function dataAppCrudService($resource) {
        return {
            clientResource: clientResource
        };

        function clientResource() {
            return $resource("http://localhost:3000/api/clients");
        }
    }
})(window.angular);