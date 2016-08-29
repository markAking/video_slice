'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  "ngAnimate",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.buffering",
  "com.2fdevs.videogular.plugins.poster",
  "com.2fdevs.videogular.plugins.dash",
  'myApp.view1'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
