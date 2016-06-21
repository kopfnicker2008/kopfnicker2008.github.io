"use strict";

(function () {

    var app = angular.module('myApp.edit', ['ngRoute', 'myApp.users']);

    app.controller( 'EditCtrl', function ( $scope, $routeParams, $log, user ) {
        this.label = "Dies ist die Edit View !!";
        this.userID = $routeParams.id || 'id wurde nicht übergeben';

        $log.debug ( user );
    });

    app.config ( function ($routeProvider) {
        $routeProvider.when('/edit/:id', {
            templateUrl: 'edit/edit.html',
            controller: 'EditCtrl',
            controllerAs: 'ctrl',
            resolve: {
                'user': function ( $users, $route, $log ) {
                    $log.debug ( $route );
                    $log.debug ("get user with id ::: ", $route.current.params.id );
                    return $users.getUser ( {user_id:$route.current.params.id} );
                }
            }
        })
    } );

})();