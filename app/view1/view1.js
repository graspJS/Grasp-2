'use strict';

angular.module('Grasp.view1', ['ngRoute'])

.controller('View1Ctrl', function($scope, socket) {
  $scope.messages = [];

  socket.on('onMessageAdded', function(data) {
    $scope.messages.push(data);
  }); 

  $scope.addMessage = function(message) {
    var messagez = {
      id: new Date().getTime(), 
      title: 'New Message',
      body: 'Pending'
    }
    $scope.messages.push(message);
    socket.emit('addMessage', message);
  }
});
