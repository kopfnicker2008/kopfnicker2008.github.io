"use strict";

(function () {

    var app = angular.module( 'myApp.users' );

    app.directive( 'doHover', function () {
        return {
            restrict: 'A',
            link: function ( scope, elem, attr, ctrl ) {
                //console.log ( scope, elem, attr, ctrl );
                elem.on ('mouseover', function () {
                    elem.css( 'color', 'red' );
                });
                elem.on ('mouseout', function () {
                    elem.css( 'color', null );
                });

                elem.on ('$destroy', function () {
                    elem.off( 'mouseover' );
                    elem.off( 'mouseout' );
                    elem.off( '$destroy' );
                   console.log ("removed");
                });

            }
        }
    });

    app.directive( 'ntUser', function () {
        return {
            templateUrl: function ( elem, attr ) {
                if ( attr.type === "edit" )
                    return "users/users-name-edit-temp.html"
                return "users/users-name-temp.html"
            },
            controllerAs: 'ctrl',
            controller: 'userDirectiveCtrl',
            scope: {
                name: '=firstname',
                del : "&"
            },
            restrict: 'E',
            transclude: true,
            replace: false
        };
    });

})();