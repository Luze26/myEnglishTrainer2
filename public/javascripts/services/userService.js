/**
 * Service to manage connection and user information
 */
angular.module('trainer').factory('userService', ['$http', '$rootScope', '$q',
    function($http, $rootScope, $q) {
    
    var service = {};
    
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    /**
     * Connected user
     */
    service.user = null;    
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    /**
     * Try to connect an user
     * @argument {string} name User's name
     * @argument {string} password User's password
     * @returns {promise}
     */
    service.connect = function(name, password) {
        var deferred = $q.defer();
        
        $http.post("/user/connect", {name: name, password: password}).success(
                function(data) {
                    $rootScope.$broadcast('connection', data);
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };
    
    service.isConnected = function() {
        return user !== null;
    };
    
    var getCurrentUser = function() {
        $http.get("/user/getCurrent").success(
            function(data) {
                if(data) {
                    $rootScope.$broadcast('connection', data);
                }
            })
            .error(function(data) {
            });
    };
    
    getCurrentUser();
    
    return service;
}]);