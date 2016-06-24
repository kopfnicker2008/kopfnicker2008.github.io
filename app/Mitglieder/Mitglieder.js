(function (angular) {
  "use strict";

  var app = angular.module('myApp.Mitglieder', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  app.controller('MitgliederCtrl', ['$scope', 'fbutil', '$firebase','$firebaseObject', '$firebaseArray',
    function($scope, fbutil, $firebase, $firebaseObject, $firebaseArray) {
      //var users = $firebaseArray(fbutil.ref('users'));
      $scope.users = {};
      var obj = $firebaseObject(fbutil.ref('users'));

      // to take an action after the data loads, use the $loaded() promise
      obj.$loaded().then(function() {

        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach(obj, function(value, key) {
          console.log(key, value);
          $scope.users.push(value);
        });
      });



      $scope.gotoUser = function(id){

      }
    }
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    // require user to be authenticated before they can access this page
    // this is handled by the .whenAuthenticated method declared in
    // components/router/router.js


    //$routeProvider.whenAuthenticated('/Mitglieder', {
    $routeProvider.when('/Mitglieder', {
      templateUrl: 'Mitglieder/Mitglieder.html',
      controller: 'MitgliederCtrl'
    })
  }]);

})(angular);