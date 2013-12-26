angular.module('trainer').controller('lexiconCtrl', ['$scope', 'lexiconService', 'userService', 
    function($scope, lexiconService, userService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.isConnected = false;
    
    $scope.lexicons = [];
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    $scope.$on('connection', function(event, data) {
        $scope.isConnected = true;
    });
    
    $scope.$on('lexiconsChange', function(event, data) {
        $scope.lexicons = data;
    });
    
    $scope.newLexicon = function() {
        lexiconService.newLexicon("l1");
    };
    
  }]);