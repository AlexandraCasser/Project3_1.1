var app = angular.module('user-form', ['ngRoute']);

app.controller('FormController',['$http', '$scope', '$location', '$rootScope', '$routeParams', function($http, $scope, $location, $rootScope, $routeParams){ //location changes the hash values in the url
	var controller = this;
	$rootScope.dudeName = "";
	this.password = null;
	this.id = $routeParams.id;

	//this is for NEW SIGN UP USERS
	$scope.addUser = function() {
		var uname = $scope.username;
		var pword = $scope.password;
		console.log('USER NAME ' + uname);
		console.log('PASSWORD ' + pword);

		//POST THE USER INFO
		$http.post('/user/signup', {username : uname, password : pword}).then(function(response){

			var userID = response.data._id;
			// console.log(controller)
			//This will now post to the user ID
			$location.path('/user/' + response.data._id); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular	

				//once user is signed up, pull up user info immediately		
			$http.get("/user/" + userID).then(function(response){
	            console.log("This is the response.data.username ", response.data.username);
	            console.log("This is the username through Scope", $scope.username);
	            $rootScope.user = response.data;
	            console.log("This is dude Name", $rootScope.dudeName)
	           
	        })
		},
		function(err){
			alert('ERROR: That Username is already taken');
			console.log(err);
		});

	};


	$scope.loginUser = function() {
		console.log('WORKING!!!');
	//need to run an ajax POST call to authenticate user name and password and have the server authenticate then
	//$rooteScope is a super global variable ... attaches all of your properties to a global object
		var uname = $scope.username;
		var pword = $scope.password;
		console.log('NAME ' + this.username + ' PASSWORD ' +  this.password);
		$http.post('/user/login', {username: uname, password : pword}).then(function(response){
			
			console.log(response.data); //looking for req.user.id here? We need the server to auth and then we need to grab this somehow
			var userID = response.data._id;
			// console.log(controller)
			//This will now post to the user ID
			$location.path('/user/' + response.data._id); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular	
			
			//once user is loggedin, pull up user info immediately		
			$http.get("/user/" + userID).then(function(response){

	            $rootScope.user = response.data;
	        })
		},
		function(err){
			console.log(err);
		});
	}; //END loginUser function

	$rootScope.logoutUser = function() {
		var user = $rootScope.user;
		console.log(user._id);
		console.log('LOGOUT WORKING');
		$http.get('/user/' + user._id + '/logout').then(function(response){
			console.log(response);
			$rootScope.user = null;
		},
		function(err){
			console.log(err);
		});
	} //End log out user

}]); //END Form Controller

app.directive('userForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/userform.html',
		controller: 'FormController',
		controllerAs: 'formCtrl'
	}
}); //END form directive

app.directive('loginForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/userloginform.html',
		controller: 'FormController',
		controllerAs: 'formCtrl'
	}
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true});
	$routeProvider
	// .when('/' + req.user.id , {
	// 	templateUrl: 'partials/main.html',
	// 	controller: 'FormController', 
	// 	controllerAs: 'formCtrl'
	// })
.when('/user/login', {
		templateUrl: 'partials/userloginform.html',
		controller: 'FormController', 
		controllerAs: 'formCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);



////////////
///OLD CODE
///////////


		// if ($scope.username == 'John' && $scope.password == 'John') { //need to change condition to if authenticated
		// 	$rootScope.loggedIn = true;
		// 	$location.path('/user/login'); 	
		// 	$http({
		// 		method: 'GET',
		// 		url: '/user/' + req.user.id, //or some sort of id ... 
		// 		data: this
		// 	}).then(function(response){
		// 		console.log(response.data);
		// 		console.log($scope);
		// 	}, 
		// 	function(err){
		// 		console.log(err);
		// 	});
		// } else {
		// alert('You are not signed up');
		// }

		// 	}).
// when('/user', {
// 		resolve: {
// 			'check' : function($location, $rootScope) {
// 				console.log('RESOLVE WORKING');
// 			// 	if ($rootScope.loggedIn) {
// 			// 		$location.path('/user');
// 			// 	} else {
// 			// 		$location.path('/');
// 			// 	}
// 			}
// 		},
// 		templateUrl: 'partials/main.html',
// 		controller: 'FormController', 
// 		controllerAs: 'formCtrl'
