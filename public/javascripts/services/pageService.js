/**
 * Service to manage pages
 */
angular.module('trainer').factory('pageService', ['$rootScope',
    function($rootScope) {
    
    var service = {};
    
    service.page = 0;
    
    $rootScope.$on('connection', function(event, data) {
        service.page = 1;
    });
    
    service.changePage = function(pageNumber) {
        service.page = pageNumber;
    };
    
    return service;
}]);

