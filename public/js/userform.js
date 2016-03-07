var app = angular.module('user-form', ['ngRoute']);

app.controller('FormController',['$http', '$scope', '$location', '$rootScope', function($http,$scope, $location, $rootScope){ //location changes the hash values in the url
	var controller = this;
	this.name = null;
	this.password = null;

	$scope.addUser = function() {
		console.log('WORKING');

		console.log(this.username);
		console.log(this.password);

		$http({
			method: 'POST',
			url: '/user',
			data: this
		}).then(function(response){
			console.log(response);
			// console.log($scope);
			// console.log(controller.name);
			// console.log(controller.password);
		},
		function(err){
			alert('ERROR');
			console.log(err);
		});

		$location.path('/user'); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular	
	};

	$scope.loginUser = function() {
		console.log('WORKING!!!');
	//need to run an ajax POST call to authenticate user name and password and have the server authenticate then
	//$rooteScope is a super global variable ... attaches all of your properties to a global object
		this.username = $scope.username;
		this.password = $scope.password;
		console.log('NAME ' + this.username + ' PASSWORD ' +  this.password);
		// $http({
		// 	method: 'POST',
		// 	url: '/user/',
		// 	data: this
		// }).then(function(response){
		// 	console.log(response.data); //looking for req.user.id here? We need the server to auth and then we need to grab this somehow
		// },
		// function(err){
		// 	console.log(err);
		// });

		if ($scope.username == 'John' && $scope.password == 'John') { //need to change condition to if authenticated
			$rootScope.loggedIn = true;
			$location.path('/user/'); 	
			$http({
				method: 'GET',
				url: '/user' + req.user.id, //<<<<< or some sort of id ... 
				data: this
			}).then(function(response){
				console.log(response.data);
				console.log($scope);
			}, 
			function(err){
				console.log(err);
			});
		} else {
		alert('You are not signed up');
		}
	};

}]); //<<<<<<END Form Controller

app.directive('userForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/userform.html',
		controller: 'FormController',
		controllerAs: 'formCtrl'
	}
}); //<<<<<< END form directive

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
	$routeProvider.when('/', {
		templateUrl: 'partials/userform.html',
		controller: 'FormController', 
		controllerAs: 'formCtrl'
	}).when('/login', {
		templateUrl: 'partials/userloginform.html',
		controller: 'FormController', 
		controllerAs: 'formCtrl'
	}).when('/user', {
		resolve: {
			'check' : function($location, $rootScope) {
				console.log('RESOLVE WORKING');
				if ($rootScope.loggedIn) {
					$location.path('/user');
				} else {
					$location.path('/');
				}
			}
		},
		templateUrl: 'partials/fakeuserpage.html',
		controller: 'FormController', 
		controllerAs: 'formCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);



////////////
///OLD CODE
///////////



