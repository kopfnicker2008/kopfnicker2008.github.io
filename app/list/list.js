"use strict";

(function () {

    var app = angular.module('myApp.list', ['ngRoute']);
    //var app = angular.module('myApp.home', ['firebase.auth', 'firebase', 'firebase.utils', 'ngRoute']);

    app.controller( 'ListCtrl', ['$scope', '$log', 'usersList', function ( $scope, $log, usersList ) {

        this.label = "Dies ist die List View !!";
        this.users = usersList;
        $log.debug(usersList)


    }]);



    //app.controller('ChatCtrl', ['$scope', 'usersList', function($scope, usersList) {
    //    $scope.users = usersList;
    //    //$scope.addUser = function(newUser) {
    //    //    if( newUser ) {
    //    //        $scope.users.$add({text: newUser});
    //    //    }
    //    //};
    //}]);

    app.factory('usersList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
        var ref = fbutil.ref('users').limitToLast(10);
        return $firebaseArray(ref);
    }]);

    app.controller ( 'ListItemCtrl', function ($scope, $log ) {
       $scope.$root.$on ( '$routeChangeSuccess', function ( event, crr, pre ) {
           //$log.debug ( crr );
           if ( crr.loadedTemplateUrl == "list/list.html" )
           {
               $scope.activeClass = 'active';
           }
           else
           {
               $scope.activeClass = undefined;
           }
       }) ;
    });

    //var listView = angular.module('app.listView', ['app.users']);

    app.config ( function ($routeProvider) {
        $routeProvider.when('/list', {
            templateUrl: 'list/list.html',
            controller: 'ListCtrl',
            controllerAs: 'ctrl',
            reloadOnSearch: false,
            resolve: {
                //'users': function ( $users ) {
                //    return $users.getUsers ();
                //}
            }
        })
    } );

})();