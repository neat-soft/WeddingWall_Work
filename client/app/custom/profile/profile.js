'use strict';

angular.module('WeddingWall')
  .config(function ($routeProvider) {
   $routeProvider
      .when('/profile', {
        templateUrl: 'app/custom/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });