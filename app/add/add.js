"use strict";

(function () {

    var app = angular.module('myApp.add', ['ngRoute']);

    app.controller( 'AddCtrl', ['fbutil', '$firebaseArray', '$location', function (fbutil, $firebaseArray, $scope, $location ) {
        this.create = function (user) {
            var ref = fbutil.ref('users').limitToLast(10);
            var list = $firebaseArray(ref);
            list.$add(user);
            //$location.path( '/list');
        }
    }]);

    app.factory('usersList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
        var ref = fbutil.ref('users').limitToLast(10);
        return $firebaseArray(ref);
    }]);

    //app.controller ( 'AddItemCtrl', function ($scope, $log ) {
    //    $scope.$root.$on ( '$routeChangeSuccess', function ( event, crr, pre ) {
    //        //$log.debug ( crr );
    //        if ( crr.loadedTemplateUrl == "add/add.html" )
    //        {
    //            $scope.activeClass = 'active';
    //        }
    //        else
    //        {
    //            $scope.activeClass = undefined;
    //        }
    //    }) ;
    //});

    //var addView = angular.module('app.addView', ['app.users']);

    app.config ( function ($routeProvider) {
        $routeProvider.when('/add', {
            templateUrl: 'add/add.html',
            controller: 'AddCtrl',
            controllerAs: 'ctrl'

        })
    } );



})();