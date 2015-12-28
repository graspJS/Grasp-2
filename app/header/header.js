'use strict';

angular.module('Grasp.header', ['ngRoute'])

.controller('HeaderCTRL', function($scope, socket, $window) {
  $scope.queue = []; 

  $scope.addStudent = function() {
    Queue.enqueue(); 
  }; 

  $scope.newTeacher = function() {
    Queue.dequeue()
    .then(function(data) {
      // Connect teacher to student with sockets
    })
  }

})
.factory('Queue', function() {
  var studentQueue = {
    oldestIndex: 1;
    newestIndex: 1; 
    storage: {}; 
  }; 

  var size = function() {
    return studentQueue.newestIndex - studentQueue.oldestIndex; 
  }; 

  var enqueue = function(data) {
    studentQueue[studentQueue.newestIndex] = data; 
    studentQueue.newestIndex++; 
  }; 

  var dequeue = function() {
    if ()
  }
}); 
