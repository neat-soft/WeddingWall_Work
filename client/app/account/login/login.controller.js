'use strict';
angular.module('WeddingWall')
  .controller('LoginCtrl', function ($rootScope, $scope,Auth) {
    $scope.user = {};
    Auth.logout();
    $scope.login = function(form){  	
       	console.log("In login");
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to Account
          $location.path('/account');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      
    };
    
   });
