'use strict';

/* Directives */

// if a directive is only "restrict: 'A'" and "link:", you can just return the function

var directives = angular.module('shopCartApp.directives', []);

directives.directive('scrollSpy', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.scrollSpy, function(value) {
                setTimeout(function() { element.scrollspy('refresh'); }, 500);
            }, true);
        }
    }
});

directives.directive('scrollTo', function($location, $window){
    // if a directive is only "restrict: 'A'" and "link:", you can just return the function
    return function(scope, element, attrs) {
        element.bind("click",function(event) {
            event.preventDefault();
            var hash =
                (attrs.href.substr(0,1) == '/')
                    ? attrs.href
                    : $location.path() + attrs.href;

            if ($window.location.hash.substr(1) == hash) {
                // if there was no change in the hash, then the browser will
                // not trigger the $routeChangeSuccess handler, so we
                // have to manually fire $anchorScroll()
                $anchorScroll();
            } else {
                $window.location.hash = hash;
            }
        });
    }
});

//
//directives.directive('scrollTo', function(){
//    // if a directive is only "restrict: 'A'" and "link:", you can just return the function
//    return function(scope, element, attrs) {
//        element.bind("click",function(event) {
//            event.preventDefault();
//            var top = $(attrs.href).position().top;
//            window.scrollTo(0,top);
//        });
//    }
//});

//directives.directive('scrollSpy', function($window){
//    return {
//        restrict: 'A',
//        link: function(scope, element, attrs) {
//
//            var scrollPoints = $(attrs['scroll-points']);
//
//            angular.element($window).bind('scroll', function() {
//                var offset;
//                if (angular.isDefined($window.pageYOffset)) {
//                    offset = $window.pageYOffset;
//                } else {
//                    var iebody = (document.compatMode && document.compatMode !== "BackCompat") ? document.documentElement : document.body;
//                    offset = iebody.scrollTop;
//                }
//                console.log('scrolled: ' + offset);
//            });
//        }
//    }
//});
