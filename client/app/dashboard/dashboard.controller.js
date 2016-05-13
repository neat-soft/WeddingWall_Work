'use strict';
angular.module('WeddingWall')
  .controller('DashboardCtrl', function ($http,$rootScope, $scope,Auth) {
    console.log("Dashboard");
    $scope.AMVs; 

	  $http.get('/api/amvs/getAmvs')
	      .success(function(data) {
	        if (data.length >=1){
	          $scope.AMVs = data[0];
	        }
	        else
	        {
	          toastr.error("Not Found Default Settings");
	        }
	        }).error(function(err) {
	          toastr.error(err);
	        });

	  $scope.update = function(form){  	
			$http.post('/api/amvs/updateAmvs',$scope.AMVs)
	      .success(function(data) {
	        	toastr.success("Updated Successfully.");
	        	$scope.AMVs = data;
	        }).error(function(err) {
	          toastr.error(err);
	        });      
    };

   });
