'use strict';

// Declare app level module which depends on views, and components
angular.module('Grasp', [
  'Grasp.Canvas',
  'Grasp.view1',
  'Grasp.view2',
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/canvas', {
      templateUrl: 'canvas/canvas.html',
      controller: 'CanvasCTRL'
    })
    .otherwise({redirectTo: '/canvas'});
}]);
