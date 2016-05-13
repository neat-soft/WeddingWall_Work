'use strict';
angular.module('WeddingWall')
  .controller('MainCtrl', function ($http,$rootScope, $scope, $location) {
    console.log("In MainController");
  $scope.AMVS; 

  $http.get('/api/amvs/getAmvs')
      .success(function(data) {
        if (data.length >=1){
          $scope.AMVS = data[0];
        }
        else
        {
          toastr.error("Not Found Default Settings");
        }
        }).error(function(err) {
          toastr.error(err);
        });

  $scope.create_weddingwall = function () {
  	// body...
  	console.log("Wedding Wall Create");
  		$location.path('/profile');
   };  
});
