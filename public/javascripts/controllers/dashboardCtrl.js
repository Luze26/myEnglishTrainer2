angular.module('trainer').controller('dashboardCtrl', ['$scope', 'lexiconService', 'pageService', 
    function($scope, lexiconService, pageService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.pageService = pageService;
    
    $scope.lexicons = [];
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    $scope.$on('lexiconsChange', function(event, data) {
        $scope.lexicons = data;
    });
    
    $scope.newLexicon = function() {
        lexiconService.newLexicon("l1");
    };  
    
    $scope.selectLexicon = function(lexicon) {
        lexiconService.selectLexicon(lexicon);
        pageService.changePage(2);
    };
}]);

