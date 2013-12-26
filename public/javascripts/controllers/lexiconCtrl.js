angular.module('trainer').controller('lexiconCtrl', ['$scope', 'lexiconService', 'userService', 'translationService', 
    function($scope, lexiconService, userService, translationService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.isConnected = false;
    
    $scope.word = "";
    
    $scope.translations = [];
    
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
    
    $scope.translate = function() {
        $scope.translations = [];
        translationService.getTranslations($scope.word)
            .then(function(data) {
                $scope.translations = data;
            },
            function(error) {
            });
    };
    
    $scope.addWord = function() {
        lexiconService.addWord($scope.lexicons[0]._id, $scope.word, $scope.translations);
        $scope.translations = [];
        $scope.word = "";
    };
  }]);