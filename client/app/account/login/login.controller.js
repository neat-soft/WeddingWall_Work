'use strict';
angular.module('WeddingWall')
  .controller('LoginCtrl', function ($http,$location,$rootScope, $scope,Auth) {
    $scope.user = {};
    Auth.logout();
    $scope.login = function(form){  	
      console.log("In login");
      $http.get('/api/user/login/' + $scope.user.email +'/' + $scope.user.password)
      .success(function(user) {
        if (user.length >=1){
          if (user[0].role == "admin")
          {
            $location.path('/dashboard');
          }
        }
        else
        {
          toastr.error("Not registered User");
        }
        }).error(function(err) {
          toastr.error(err);
        });
    };
    
   });
