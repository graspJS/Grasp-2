angular.module('Grasp.Auth', ['ngRoute'])

.controller('AuthCTRL', function ($scope, Auth, $location) {
  $scope.loginUser = {};
  $scope.signUpUser = {};

  $scope.signin = function () {
    Auth.signin($scope.loginUser)
    .then(function () {
        // $window.localStorage.setItem('com.whereAmI', token);
        // console.log("This is the token", token);
        $location.path('/canvas');
      })
      .catch(function (error) {
        console.error(error);
        $location.path('/auth');
      });
    };

  $scope.signup = function () {
    Auth.signup($scope.signUpUser)
    .then(function () {
        $location.path('/canvas');
        // $window.localStorage.setItem('com.whereAmI', token);
      })
      .catch(function (error) {
        console.error(error);
      });
  };


})
.factory('Auth', function ($http, $location, $window){
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (resp) {
      // return resp.data.token;
      console.log("woooo");
    });
  };

  var signup = function (user) {
    console.log(user);
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  return {
      signin: signin,
      signup: signup
    };
});