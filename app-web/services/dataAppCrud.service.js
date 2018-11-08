(angular => {
    "use strict"

    angular
        .module("appCrud")
        .factory("dataAppCrudService", dataAppCrudService);

    dataAppCrudService.$inject = ["$resource"];

    function dataAppCrudService($resource) {
        return {
            addressResource: addressResource,
            classResource: classResource,
            clientResource: clientResource
        };

        function addressResource() {
            return $resource("http://localhost:3000/api/addresses/:id");
        }

        function clientResource() {
            return $resource("http://localhost:3000/api/clients/:id");
        }

        function classResource() {
            return $resource("http://localhost:3000/api/classes/:id");
        }
    }
})(window.angular);