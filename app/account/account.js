(function (angular) {
  "use strict";

  var app = angular.module('myApp.account', ['firebase', 'firebase.utils', 'firebase.auth', 'ngRoute']);

  app.controller('AccountCtrl', ['$scope', 'Auth', 'fbutil', 'user', '$location', '$firebaseObject',
    function($scope, Auth, fbutil, user, $location, $firebaseObject) {
      var unbind;
      // create a 3-way binding with the user profile object in Firebase
      var profile = $firebaseObject(fbutil.ref('users', user.uid));
      profile.$bindTo($scope, 'profile').then(function(ub) { unbind = ub; });

      // expose logout function to scope
      $scope.logout = function() {
        profile.online = 'false';
        if( unbind ) { unbind(); }
        profile.$destroy();
        Auth.$unauth();
        $location.path('/login');
      };


    }
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    // require user to be authenticated before they can access this page
    // this is handled by the .whenAuthenticated method declared in
    // components/router/router.js
    $routeProvider.whenAuthenticated('/account', {
      templateUrl: 'account/account.html',
      controller: 'AccountCtrl'
    })
  }]);

})(angular);