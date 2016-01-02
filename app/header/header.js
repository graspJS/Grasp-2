'use strict';

angular.module('Grasp.header', ['ngRoute', 'ui.bootstrap'])

.controller('HeaderCTRL', function($scope, Choice, socket, $window) {  
  $scope.isTeacher = false; 
  $scope.isStudent = false; 
  $scope.numberOfTeachers = 0; 
  $scope.numberOfStudents = 0;

  $scope.teacher = function() {
    Choice.teacher();
    $scope.isTeacher = !$scope.isTeacher;
  };
  $scope.student = function() {
    Choice.student(); 
    $scope.isStudent = !$scope.isStudent;
  };
  $scope.leave = function() {
    Choice.leave();
    if ($scope.isTeacher) {
      $scope.isTeacher = !$scope.isTeacher;
    } else {
      $scope.isStudent = !$scope.isStudent;
    }  
  };  

  socket.on('updateBadge', function(data) {
    $scope.numberOfTeachers = data.teachers; 
    $scope.numberOfStudents = data.students; 
  }); 

  socket.on('leftUser', function() {
    $scope.leave(); 
  }); 
})
.factory('Choice', function ($http, $location, socket, $window) { 
  var teacher = function() {
    $window.localStorage.setItem('isTeacher', true);
    socket.emit('addTeacher', $window.localStorage.getItem('username')); 
  }; 
  var student = function() {
    $window.localStorage.setItem('isTeacher', false);
    socket.emit('addStudent', $window.localStorage.getItem('username')); 
  }; 

  var leave = function() {
    socket.emit('leave'); 
  }
  return {
    student: student,
    teacher: teacher,
    leave: leave
  }; 
}); 
