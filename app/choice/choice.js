angular.module('Grasp.Choice', ['ngRoute', 'ngSocket'])
.controller('ChoiceCTRL', function ($scope, Auth, $location, $window, $rootScope, $socket) {

   $scope.raise = function(message) {            
          $socket.emit('createRoom', message);
        };
})