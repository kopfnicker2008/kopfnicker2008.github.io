"use strict";

(function () {

    var app = angular.module( 'myApp.users', ['ngResource'] );

    app.provider ('$users', function (  ) {

        //var endpoint = 'http://localhost/training/api/rest/yii/user_rest/index.php/api/user';

        this.setEndpoint = function ( url ) {
            endpoint = url;
        };

        this.$get = function ( $resource ) {

            return $resource (
                endpoint + "/:user_id",
                {
                    user_id:'@id'
                },
                {
                    'getUser':      {method:'GET'},
                    'createUser':   {method:'POST'},
                    'getUsers':     {method:'GET', isArray:true},
                    'deleteUser':   {method:'DELETE'},
                    'updateUser':   {method:'PUT', responseType: 'text' }
                }

            );

        }


    });



})();