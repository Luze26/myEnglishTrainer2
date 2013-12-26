/**
 * Service to manage lexicons
 */
angular.module('trainer').factory('lexiconService', ['$http', '$rootScope', '$q',
    function($http, $rootScope, $q) {
    
    var service = {};
    
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    service.lexicons = [];
    
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    $rootScope.$on('connection', function(data) {
        $http.get("/lexicon/all").success(
            function(data) {
                service.lexicons = data;
                $rootScope.$broadcast('lexiconsChange', service.lexicons);
            })
            .error(function(data) {
            });
    });
    
    service.newLexicon = function(name) {
        var deferred = $q.defer();
        $http.post("/lexicon/new", {name: name}).success(
                function(data) {
                    service.lexicons.push(data);
                    $rootScope.$broadcast('lexiconsChange', service.lexicons);
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject(data);
                });
        return deferred.promise;
    };
    
    service.addWord = function(word, translations) {
        $http.post("/lexicon/addWord", {word: word, translations: translations})
            .success(function(data) {
            })
            .error(function(error){
            });
    };
    
    return service;
}]);