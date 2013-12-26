angular.module('trainer').controller('userCtrl', ['$scope', 'userService', 
    function($scope, userService) {
    
    //////////////////////////////////////////////////
    //  ATTRIBUTES
    //////////////////////////////////////////////////
    
    $scope.isConnected = false;
    
    //////////////////////////////////////////////////
    //  METHODS
    //////////////////////////////////////////////////
    
    $scope.$on('connection', function(event, data) {
        $scope.isConnected = true;
    });
    
    $scope.connect = function() {
        userService.connect($scope.name, $scope.password)
            .then(function(data) {
            },
            function(error) {
                //TODO
            });        
    };
  }]);