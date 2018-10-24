(angular => {
    "use strict"

    angular
        .module("appCrud")
        .config(['$resourceProvider', $resourceProvider => {
            $resourceProvider.defaults.actions = {
                create: {
                    method: 'POST'
                },
                get: {
                    method: 'GET',
                    params: {id: true}
                },
                getAll: {
                    method: 'GET',
                    isArray: true
                },
                update: {
                    method: 'PUT'
                },
                delete: {
                    method: 'DELETE'
                }
            };
        }]);
})(window.angular);