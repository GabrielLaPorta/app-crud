(angular => {
    "use strict"

    angular
        .module("appCrud")
        .factory("dataAppCrudService", dataAppCrudService);

    dataAppCrudService.$inject = ["$resource"];

    function dataAppCrudService($resource) {
        return {
            clientResource: clientResource,
            addressResource: addressResource
        };

        function clientResource() {
            return $resource("http://localhost:3000/api/clients/:id");
        }

        function addressResource() {
            return $resource("http://localhost:3000/api/addresses/:id");
        }
    }
})(window.angular);