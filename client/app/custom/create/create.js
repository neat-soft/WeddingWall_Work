'use strict';

angular.module('WeddingWall')
  .config(function ($routeProvider,$stateProvider) {
   $routeProvider
      .when('/create', {
        templateUrl: 'app/custom/create/create.html',
        controller: 'CreateCtrl'
      });
    /*$stateProvider  	
  	  .state('create', {
        url:'/create',
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      })*/
  });