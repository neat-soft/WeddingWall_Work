(function () {
  'use strict';
  angular.module('WeddingWall')
    .factory('productService',productService);

  productService.$inject = ['$http'];
  function productService($http) {
    return {
      getMediaFromTwitter: getMediaFromTwitter,
      getMediaFromInstagram: getMediaFromInstagram
    };
  function getMediaFromTwitter(hashtag) {
      return $http.get('/api/hashtag/twitter/getMediaFromHashTag/' + hashtag.slice( 1, hashtag.length));
  }
  function getMediaFromInstagram(hashtag) {
      return $http.get('/api/hashtag/instagram/getMediaFromHashTag/' + hashtag.slice( 1, hashtag.length));
  }
 }

})();