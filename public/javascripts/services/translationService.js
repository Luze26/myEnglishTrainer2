/**
 * Service to manage translations
 */
angular.module('trainer').factory('translationService', ['$http', '$q',
    function($http, $q) {
    
    var service = {};
    
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    
    
    service.lexicons = [];
    
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    service.getTranslations = function(word) {
        var deferred = $q.defer();
        $http.post("/translation/get", {word: word})
            .success(function(data) {
                console.log(data);
                deferred.resolve(data); 
            })
            .error(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    
    return service;
}]);