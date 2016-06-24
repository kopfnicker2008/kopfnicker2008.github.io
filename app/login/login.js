"use strict";
angular.module('myApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.html'
      });
    }])

    .controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', '$firebaseObject', function($scope, Auth, $location, fbutil, $firebaseObject) {
      $scope.email = null;
      $scope.pass = null;

      $scope.login = function(email, pass) {
        Auth.$authWithOAuthPopup('google', {scope:'email'})
            .then(function (authObject) {
              console.log(authObject);
                var profile = $firebaseObject(fbutil.ref('users', user.uid));
              var ref = fbutil.ref('users', authObject.uid);
              return fbutil.handler(function(cb) {
                ref.set({email: authObject.google.email, name: authObject.google.cachedUserProfile.name, online: 'true'}, cb);
              });
            })
            .then(function(/* user */) {
              // redirect to the account page
              var authdata = Auth.$getAuth();
              console.log('Login UID = '+authdata.uid);
              $location.path('/account');
            }, function(err) {
              $scope.err = errMessage(err);
            });
      };
    }]);