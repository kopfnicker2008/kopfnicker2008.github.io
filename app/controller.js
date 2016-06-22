angular.module('myApp', ['firebase.utils', 'firebase.auth', 'ngRoute'])
	.controller('StartCtrl', function($scope, myAuth, $firebaseAuth){
		$scope.grabAuth = myAuth.grabAuth;

		if($scope.grabAuth){

		}else{
			$location.path('/account');
		}

		$scope.logout = function(){
			myAuth.authRef.$unauth();
			$location.path('/login');
		}
	})
	.controller('loginController', function($scope, $location, myAuth, userService){
		var tmpUser = {};

		$scope.loginUser = function(){
			//myAuth.authRef.$authWithOAuthPopup
		}
	});
