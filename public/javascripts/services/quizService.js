/**
 * Service to manage quiz
 */
angular.module('trainer').factory('quizService', ['$http', '$q',
    function($http, $q) {
    
    var service = {};
    
    service.words = [];
    
    service.index = -1;
    
    service.loadQuiz = function(lexiconId) {
        var deferred = $q.defer();
        $http.post("/quiz/generate", {lexiconId: lexiconId, number: 20, tags: []})
            .success(function(data) {
                service.words = data;
                service.index = 0;
                deferred.resolve(data[0]); 
            })
            .error(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
    
    service.nextWord = function() {
        service.index++;
        return service.words[service.index];
    };
    
    service.checkWord = function(response) {
        return true;
    };
    
    return service;
}]);

