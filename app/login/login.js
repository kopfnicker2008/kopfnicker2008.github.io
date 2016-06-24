"use strict";
angular.module('myApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.html'
      });
    }])

    .controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {
      $scope.email = null;
      $scope.pass = null;

        // 1is6i5cuasOF7XleD4tq8gncGes2 -> aotten77@gmail.com
        // NxgwFr891rVvi1tsC528khKC1OO2 -> aotten.joinmedia@gmail.com

      $scope.login = function(email, pass) {
        Auth.$authWithOAuthPopup('google', {scope:'email'})
            .then(function (authObject) {
              console.log(authObject);
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