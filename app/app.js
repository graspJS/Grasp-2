'use strict';

// Declare app level module which depends on views, and components
angular.module('Grasp', [
  'Grasp.Canvas',
  'Grasp.view1',
  'ngRoute',
  'ngMaterial'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/canvas', {
      templateUrl: 'canvas/canvas.html',
      controller: 'CanvasCTRL'
    })
    .when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    })
    .otherwise({redirectTo: '/'});
}]);
