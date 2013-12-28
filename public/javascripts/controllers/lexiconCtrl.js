angular.module('trainer').controller('lexiconCtrl', ['$scope', 'lexiconService', 'translationService', 'pageService',
    function($scope, lexiconService, translationService, pageService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.pageService = pageService;
    
    $scope.word = "";
    
    $scope.lexicon = null;
    
    $scope.translations = [];
    
    $scope.lexiconService = lexiconService;
    
    $scope.tab = 0;
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    var init = function() {
        $scope.lexicon = lexiconService.selectedLexicon;
    };
    
    $scope.translate = function() {
        $scope.translations = [];
        translationService.getTranslations($scope.word)
            .then(function(data) {
                $scope.translations = $scope.translations.concat(data);
            },
            function(error) {
            });
    };
    
    $scope.addWord = function() {
        lexiconService.addWord($scope.lexicon._id, {word: $scope.word, translations: $scope.translations});
        $scope.translations = [];
        $scope.word = "";
    };
    
    $scope.addTranslation = function() {
        $scope.translations.push({term: "", sense: "", tags: ""});
    };
    
    $scope.addTag = function(tag, translation) {
        translation.tags.push(tag.tag);
        tag.tag = "";
    };
    
    $scope.showLexicon = function() {
        $scope.tab = 0;
    };
    
    $scope.showAddWord = function() {
        $scope.tab = 1;
    };
    
    $scope.$watch('lexiconService.selectedLexicon', init);
}]);