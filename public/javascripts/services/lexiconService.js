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
    
    service.selectedLexicon = null;
    
    service.words = [];
    
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
    
    service.addWord = function(lexiconId, word) {
        $http.post("/lexicon/addWord", {lexiconId: lexiconId, word: word})
            .success(function(data) {
            })
            .error(function(error){
            });
    };
    
    
    service.getWords = function(lexiconId) {
        lexiconId = !!lexiconId ? lexiconId : service.selectedLexicon._id;
        
         $http.get("/lexicon/get/" + lexiconId)
            .success(function(data) {
                service.words = data.words;
            })
            .error(function(error){
                console.log(error);
            });
    };
    
    service.selectLexicon = function(lexicon) {
        service.selectedLexicon = lexicon;
        service.getWords();
    };
    
    return service;
}]);