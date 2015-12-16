'use strict';

// Declare app level module which depends on views, and components
angular.module('Grasp', [
  'Grasp.Canvas',
  'Grasp.Auth',
  'ngRoute',
  'ngMaterial'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/canvas', {
      templateUrl: 'canvas/canvas.html',
      controller: 'CanvasCTRL'
    })
    .when('/auth', {
      templateUrl: 'auth/auth.html',
      controller: 'AuthCTRL'
    })
    .otherwise({redirectTo: '/'});
}]);