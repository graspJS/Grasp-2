'use strict';

angular.module('Grasp.chat', ['ngRoute'])

.controller('ChatCTRL', function($scope, socket) {
  $scope.usernames = []; 
  $scope.messages = [];
  $scope.ngPopupOption = {
    template:' ',
    templateUrl:"view1/view1.html",
    draggable: true,
    width: 300,
    height: 300,
    position:{
      top:200,
      left:200
    }
  }
  socket.on('onMessageAdded', function(data) {
    // $scope.usernames.push(username);
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
