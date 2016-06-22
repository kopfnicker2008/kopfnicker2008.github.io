var app = angular.module('myApp');

app.factory('myAuth', ['Auth'], function(Auth){
	var getAuth = Auth.$getAuth();

	var myAuth =  {
		grabAuth: getAuth,
		authRef: Auth
	};

	return myAuth;
});

app.factory('userService', ['FBURL'], function(FBURL, $firebaseArray){
	var myFB = new Firebase(FBURL+'/users');
	var fbRef = $firebaseArray(myFB);

	var userService = {
		addUser: function(id, username){
			fbRef.$add({
				loginID: id,
				user: username,
				online: 'false'
			});
		},
		setCurrentUser: function(user){
			current = user;
		},
		getCurrentUser: function(){
			return current;
		},
		getUser: function(){
			return fbRef;
		},
		userOnline: function(id){
			var theID = fbRef.$getRecord(id);
			theID.online = 'true';
			fbRef.$save(theID);
		}
	};

	return userService;
});