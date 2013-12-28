angular.module('trainer').controller('quizCtrl', ['$scope', 'quizService', 'lexiconService', 'pageService',
    function($scope, quizService, lexiconService, pageService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.pageService = pageService;
    
    $scope.quizService = quizService;
    
    $scope.lexicons = [];
    
    $scope.word = null;
    
    $scope.quizStarted = false;
    
    $scope.quizFinished = false;
    
    $scope.showAnswer = false;
    
    $scope.response = "";
    
    $scope.result = null;
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    $scope.$on('lexiconsChange', function(event, data) {
        $scope.lexicons = data;
    });
    
    $scope.selectLexicon = function(lexicon) {
        var promise = quizService.loadQuiz(lexicon._id);
        promise.then(function(data) {
            $scope.word = data;
            $scope.quizStarted = true;
        },
        function(error) {
            
        });
    };
    
    $scope.checkResponse = function() {
        if(!$scope.showAnswer && $scope.response !== "") {
            $scope.showAnswer = true;
            $scope.result = quizService.checkWord($scope.response);
        }
    };
    
    $scope.noResponse = function() {
        $scope.showAnswer = true;
        $scope.result = false;
    };
    
    var inputResponse = angular.element('#inputResponse');
    
    $scope.nextWord = function() {
        $scope.showAnswer = false;
        $scope.response = "";
        $scope.result = null;
        $scope.word = quizService.nextWord();
        if($scope.word === null) {
            $scope.quizFinished = true;
        }
        else {
            inputResponse.focus();
        }
    };
  }]);