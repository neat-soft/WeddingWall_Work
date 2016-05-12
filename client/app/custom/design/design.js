'use strict';

angular.module('WeddingWall')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/design', {
        templateUrl: 'app/custom/design/design.html',
        controller: 'DesignCtrl'
      });
  });