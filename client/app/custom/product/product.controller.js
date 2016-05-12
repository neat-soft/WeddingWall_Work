'use strict';
angular.module('WeddingWall')
  .controller('ProductCtrl', function ($window,$rootScope, $scope, $timeout, $location,productService,QueueService) {
    
    $scope.medias =[];
    var INTERVAL = 6000;
    var showsCount = 3;
    var instagramAccount = "@wedding_wall"
    $scope.bgimg = "../assets/images/background/section-header.png";
    $scope.queueMedias =[];
    $scope.currentAnimation = 'slide-left-animation';
    $scope.curretImage = "../assets/images/general/images/2.jpg";
    $scope.currentMediaText;
    $scope.hashtag = "#Wedding";
    $scope.currentInstruction = 0;
    $scope.instructions = ["Use hashtag " + $scope.hashtag,
                           "Follow "+instagramAccount+" if your Instagram profile is private!"];

    $scope.instructions[0] = $scope.instructions[0].replace(new RegExp('('+$scope.hashtag+')', 'gi'),
      '<a class="color_pink">$1</a>');
    $scope.instructions[1] = $scope.instructions[1].replace(new RegExp('('+instagramAccount+')', 'gi'),
      '<a class="color_pink">@WeddingWall</a>');
    $scope.instructions[1] = $scope.instructions[1].replace(new RegExp('Instagram', 'gi'),
      '<a class="color_pink">Instagram</a>');


    $scope._Index = 0;
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.medias.length - 1;
    };
    $scope.showNext = function() {
        $scope._Index = ($scope._Index < $scope.medias.length - 1) ? ++$scope._Index : 0;
    };
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

    /*function CarouselCtrl($scope) {
      $scope.myInterval = 3000;
    }*/

    function nextSlide() {
      if ($scope.medias != undefined && $scope.medias.length!= 0){
        highlightHashTag();
        $scope.showNext();
        var index = $scope._Index;
        for (var i = 0; i< showsCount; i++)
          {
             if (index >= $scope.medias.length-1)
                index = 0;
             $scope.queueMedias[i] = $scope.medias[index];
             index++;
          }
        $timeout(nextSlide, INTERVAL);
      }
    };

    function nextInstruction() {
      
        if ($scope.currentInstruction >= $scope.instructions.length-1)
        {
          $scope.currentInstruction = 0;
        }
        else
        {
          $scope.currentInstruction++;
        }
        $timeout(nextInstruction, INTERVAL);
      
    };


    function highlightHashTag()
    {
      var text = $scope.medias[$scope._Index].text;
      if ($scope.medias[$scope._Index].hashtags != undefined){
        for (var i =0; i< $scope.medias[$scope._Index].hashtags.length; i++)
        {
          var tag = $scope.medias[$scope._Index].hashtags[i];
           text = text.replace(new RegExp('('+tag+')', 'gi'),
          '<a class="color_pink">$1</a>');
        }
        $scope.currentMediaText = text;
      }
    }

    /*productService.getMediaFromTwitter($scope.hashtag)
    .success(function(result){
      if (result.data != undefined){
        for (var i = 0; i< result.data.length; i++)
        {
          $scope.medias.push(result.data[i]);
        }
    }
    }).error(function(){
      toastr.error("Error: Server not found data.");
    });*/
    //$scope.reload = function () {
    productService.getMediaFromInstagram($scope.hashtag)
    .success(function(result){
      if (result.data != undefined){
        for (var i = 0; i< result.data.length; i++)
        {
          
          $scope.medias.push(result.data[i]);
        }

      } 
      if ($scope.medias != undefined && $scope.medias.length >0){
        for (var i = 0; i < showsCount; i++)
        {
          $scope.queueMedias[i] = $scope.medias[i];
        }
         $timeout(nextSlide, INTERVAL);
         $timeout(nextInstruction, INTERVAL);
      }

    }).error(function(){
      toastr.error("Error: Server not found data.");
    });

    /*$timeout(function(){
      $scope.reload();
    },60000)

    };
    $scope.reload();*/


    /*function checkMedia(mediaUrl)
    {
      for (var i = 0; i < $scope.medias.length; i++)
      {
        for  
      }
    }*/
      /*$scope.medias = result.data;
      if ($scope.medias != undefined && $scope.medias.length >0){
        for (var i = 0; i < showsCount; i++)
        {
          $scope.queueMedias[i] = $scope.medias[i];
        }
         $timeout(nextSlide, INTERVAL);
      }*/
    

    $scope.setCurrentSlideIndex = function (index) {
      $scope._Index = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
      return $scope._Index === index;
    };
   
    $scope.setCurrentAnimation = function (animation) {
      $scope.currentAnimation = animation;
    };

    $scope.isCurrentAnimation = function (animation) {
      return $scope.currentAnimation === animation;
    };

    
    function loadSlides() {
       $scope.$apply(function(){
        $timeout(nextSlide, INTERVAL);
      });
    }  
  })
  .directive('textCarousel', function ($timeout) {
    
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
 
            var timeoutId,
                index = 0,
                values;
 
            values = attrs.values.split(',');
 
            function goToNextValue() {
 
                index += 1;
 
                if (index >= values.length) {
                    index = 0;
                }
            };
 
            function setCarouselText() {
                elem.text(values[index]);
            }
 
            function updateCarousel() {
                setCarouselText();
                goToNextValue();
                scheduleNext();
            };
 
            function scheduleNext() {
                timeoutId = $timeout(function () {
                    elem.fadeOut(200, function () {
                        $(this).text(values[index]).fadeIn(50);
                        updateCarousel();
                    });
                }, 4000);
            };
 
            updateCarousel();
 
            elem.on('$destroy', function () {
                $timeout.cancel(timeoutId);
            });
        }
    };
 
})
  
  .animation('.slide-left-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { left: $window.innerWidth}, {left: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {left: -$window.innerWidth, onComplete: done});
        }
    };
})
  .animation('.slide-down-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { top: -$window.innerHeight}, {top: 0, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {top: $window.innerHeight, onComplete: done});
        }
    };
})

  .animation('.fade-in-animation', function ($window) {
    return {
        enter: function (element, done) {
            TweenMax.fromTo(element, 1, { opacity: 0}, {opacity: 1, onComplete: done});
        },

        leave: function (element, done) {
            TweenMax.to(element, 1, {opacity: 0, onComplete: done});
        }
    };
});

