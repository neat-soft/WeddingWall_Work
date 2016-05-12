'use strict';

angular.module('WeddingWall')
  .controller('DesignCtrl', function ($rootScope, $scope, $location) {
    console.log("In CreateController");  
   $scope.number = 16;

   $scope.getNumber = function(num) {
    return new Array(num);   
}

});
