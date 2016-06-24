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
        Auth.$authWithOAuthPopup('google', {scope: ['email', 'https://www.googleapis.com/auth/drive.file']})
            .then(function (authObject) {
              console.log(authObject);
              var ref = fbutil.ref('users', authObject.uid);


                var obj = $firebaseObject(ref);

                // to take an action after the data loads, use the $loaded() promise
                obj.$loaded().then(function() {
                    console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

                    // To iterate the key/value pairs of the object, use angular.forEach()
                    angular.forEach(obj, function(value, key) {
                        console.log(key, value);
                    });

                    if(obj.online){
                        obj.online = 'true';
                        obj.accessToken = authObject.google.accessToken;
                        obj.$save();
                    }else{
                        return fbutil.handler(function(cb) {
                            ref.set({email: authObject.google.email, name: authObject.google.cachedUserProfile.name, accessToken: authObject.google.accessToken, online: 'true'}, cb);
                        });
                    }
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