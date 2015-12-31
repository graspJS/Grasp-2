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
    var messagez = {
      id: new Date().getTime(), 
      title: 'New Message',
      body: 'Pending'
    }
    message = $scope.username + " : " + message; 
    $scope.messages.push(message);
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
    document.getElementById("m").value = "";
    socket.emit('addMessage', message);
  }
});
