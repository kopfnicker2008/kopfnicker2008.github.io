(function (angular) {
  "use strict";

  var app = angular.module('myApp.Mitglieder', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  app.controller('MitgliederCtrl', ['$scope', 'fbutil', '$firebase','$firebaseObject', '$firebaseArray',
    function($scope, fbutil, $firebase, $firebaseObject, $firebaseArray) {
      var users = $firebaseArray(fbutil.ref('users'));
      var user = $firebase(ref).$asObject();

      user.$loaded().then(function() {
        $rootScope.currentUser = user;
      });
      $scope.users = [
        {
          name: 'User1',
          uid: 'asdf'
        },
        {
          name: 'User2',
          uid: 'yxcv'
        }
      ];

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