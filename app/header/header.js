'use strict';

angular.module('Grasp.header', ['ngRoute', 'ui.bootstrap'])

.controller('HeaderCTRL', function($scope, Choice, socket, $window) {
  $scope.isCollapsed = false; 
  
  $scope.teacher = function () {
    Choice.teacher();
  };
  $scope.student = function () {
    Choice.student(); 
  };
})
.factory('Choice', function ($http, $location, socket, $window) {
  var data = {
    user: $window.localStorage.getItem('username'),
    isTeacher: $window.localStorage.getItem('isTeacher')
  };  

  var student = function () {
    $window.localStorage.setItem('isTeacher', false);
    socket.emit('addStudent', data); 
  }; 

  var teacher = function () {
    $window.localStorage.setItem('isTeacher', true);
    socket.emit('addTeacher', data); 
  }; 

  return {
    student: student,
    teacher: teacher
  }; 
}); 
