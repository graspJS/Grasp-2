'use strict';

angular.module('Grasp.header', ['ngRoute', 'ui.bootstrap'])

.controller('HeaderCTRL', function ($scope, Choice, socket, $window) {  
  $scope.isTeacher = false; 
  $scope.isStudent = false; 

  $scope.teacher = function () {
    Choice.teacher();
    $scope.isTeacher = !$scope.isTeacher; 
  };
  $scope.student = function () {
    Choice.student(); 
    $scope.isStudent = !$scope.isStudent; 
  };
  $scope.disconnect = function () {
    Choice.disconnect();
    if ($scope.isTeacher) {
      $scope.isTeacher = !$scope.isTeacher; 
    } else {
      $scope.isStudent = !$scope.isStudent;
    } 
  }; 
  $scope.signout = function () {
  }
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

  var disconnect = function () {
    socket.emit('disconnect'); 
  }
  return {
    student: student,
    teacher: teacher,
    disconnect: disconnect
  }; 
}); 
