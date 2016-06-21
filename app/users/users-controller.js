"use strict";

(function () {

    var app = angular.module( 'myApp.users' );

    app.controller ( 'userCtrl', function ( $scope) {
        $scope.userList = [ {
            lastname: 'Müller',
            firstname: 'Hans-Peter'
        }, {
            lastname: 'Ünlü',
            firstname: 'Saban'
        }];

        $scope.delUserByInd = function ( ind ) {
            this.userList.splice( ind, 1 );
        };

    });

    app.controller ( 'userDirectiveCtrl', function ( $scope , $log ) {

            this.label = "senden";


            $scope.submit = function () {
                alert ( this.name );
            }
    });

})();