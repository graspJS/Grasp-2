'use strict';

angular.module('Grasp.chat', ['ngRoute'])

.controller('ChatCTRL', function($scope, socket, $window) {
  $scope.ngPopupOption = {
    template:'',
    templateUrl:"chat/chat.html",
    resizable:true,
    draggable: true,
    pinned: true, 
    width: 350,
    height: 300,
    position:{
      top:377,
      left:0
    },
    title : "Chat"
  }
  $scope.username = $window.localStorage.getItem('username');
  $scope.usernames = [];
  $scope.messages = [];

  socket.on('onMessageAdded', function(data) {
    $scope.messages.push(data);
  }); 

  $scope.addMessage = function(message) {
    message = $scope.username + " : " + message; 
    $scope.messages.push(message);
    socket.emit('addMessage', message);
  }
});
