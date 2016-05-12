'use strict';

angular.module('WeddingWall')
  .config(function ($routeProvider,$stateProvider) {
   $routeProvider
      .when('/product', {
        templateUrl: 'app/custom/product/product.html',
        controller: 'ProductCtrl'
      });
    /*$stateProvider  	
  	  .state('product', {
        url:'/product',
        templateUrl: 'app/product/product.html',
        controller: 'ProductCtrl'
      })*/
  });