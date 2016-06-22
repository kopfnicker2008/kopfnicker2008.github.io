"use strict";
angular.module('myApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    });
  }])

  .controller('LoginCtrl', ['$scope', '$firebaseObject', 'Auth', '$location', 'fbutil', function($scope, $firebaseObject, Auth, $location, fbutil) {
    $scope.email = null;
    $scope.pass = null;

    $scope.login = function(email, pass) {
      Auth.$authWithOAuthPopup('google', {scope:'email'})
          .then(function (authObject) {
            console.log(authObject);
            var ref = fbutil.ref('users', authObject.uid);
            var obj = $firebaseObject(ref);
            obj.foo = "bar";
            obj.$save();

            //return fbutil.handler(function(cb) {
            //  ref.set({email: authObject.google.email, name: authObject.google.cachedUserProfile.name}, cb);
            //});
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