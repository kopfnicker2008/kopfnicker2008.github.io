"use strict";

(function () {

	var app = angular.module( 'myApp.MitgliederService', ['ngResource'] );

	app.factory ('$Mitglieder', function (  ) {

		var _getUser = function(id){
			var profile = $firebaseObject(fbutil.ref('users', id));
			return profile;
		};

		return {
			getUser: _getUser
		};

		//var endpoint = 'http://localhost/training/api/rest/yii/user_rest/index.php/api/user';

		//this.setEndpoint = function ( url ) {
		//	endpoint = url;
		//};
		//
		//this.$get = function ( $resource ) {
		//
		//	return $resource (
		//		endpoint + "/:user_id",
		//		{
		//			user_id:'@id'
		//		},
		//		{
		//			'getUser':      {method:'GET'},
		//			'createUser':   {method:'POST'},
		//			'getUsers':     {method:'GET', isArray:true},
		//			'deleteUser':   {method:'DELETE'},
		//			'updateUser':   {method:'PUT', responseType: 'text' }
		//		}
		//
		//	);
		//
		//}


	});



})();