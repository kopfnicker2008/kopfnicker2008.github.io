(function(angular) {
  "use strict";

  var app = angular.module('myApp.members', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

  app.controller('MembersCtrl', ['$scope', 'fbutil', 'user', '$firebaseObject', 'FBURL', function ($scope, fbutil, user, $firebaseObject, FBURL) {
    $scope.syncedValue = $firebaseObject(fbutil.ref('syncedValue'));
    $scope.user = user;
    $scope.FBURL = FBURL;
  }]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/members', {
      templateUrl: 'members/members.html',
      controller: 'MembersCtrl',
      resolve: {
        // forces the page to wait for this promise to resolve before controller is loaded
        // the controller can then inject `user` as a dependency. This could also be done
        // in the controller, but this makes things cleaner (controller doesn't need to worry
        // about auth status or timing of accessing data or displaying elements)
        user: ['Auth', function (Auth) {
          return Auth.$waitForAuth();
        }]
      }
    });
  }]);

})(angular);

