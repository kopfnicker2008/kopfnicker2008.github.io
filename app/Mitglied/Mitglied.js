"use strict";

(function () {

    var app = angular.module('myApp.Mitglied', ['ngRoute', 'myApp.MitgliederService']);

    app.controller( 'MitgliedCtrl', function ( $scope, $routeParams, $log, user ) {
        this.label = "Dies ist die Edit View !!";
        this.userID = $routeParams.id || 'id wurde nicht übergeben';
        this.Mitglied = user;

    });

    app.config ( function ($routeProvider) {
        $routeProvider.when('/Mitglied/:id', {
            templateUrl: 'Mitglied/Mitglied.html',
            controller: 'MitgliedCtrl',
            controllerAs: 'ctrl',
            resolve: {
                'user': function ( $Mitglieder, $route, $log ) {
                    $log.debug ( $route );
                    $log.debug ("get user with id ::: ", $route.current.params.id );
                    return $Mitglieder.getUser ($route.current.params.id);
                }
            }
        })
    } );

})();