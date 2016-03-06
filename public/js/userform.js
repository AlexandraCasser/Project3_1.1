var app = angular.module('user-form', ['ngRoute']);

app.controller('FormController',['$http', '$scope', function($http,$scope){
	var controller = this;
	this.name = null;
	this.password = null;

	this.addUser = function() {
		console.log('WORKING');
		$http({
			method: 'POST',
			url: '/users/signup',
			data: this
		}).then(function(response){
			console.log(resonse.data);
			console.log($scope);
			console.log(controller.name);
			console.log(controller.password);
		},
		function(err){
			console.log(err);
		});
	};

	this.loginUser = function() {
		console.log('WORKING!!!');
		$http({
			method: 'GET',
			url: '/users/login',
			data: this
		}).then(function(response){
			console.log(response.data);
			console.log($scope);
		}, 
		function(err){
			console.log(err);
		});
	};
}]);

app.directive('userForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/userform.html',
		controller: 'FormController',
		controllerAs: 'formCtrl'
	}
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProivder){
	$locationProivder.html5Mode({enable:true});
	$routeProvider.when('/users', {
		templateUrl: 'partials/userpage.html',
		controller: 'UserController', //<<<<<Guess work
		controllerAs: 'userCtrl'
	}).otherwise({
		redirectTo: '/'
	});
}]);



////////////
///OLD CODE
///////////

// app.directive('loginForm', function(){
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'partials/userloginform.html',
// 		controller: 'FormController',
// 		controllerAs: 'formCtrl'
// 	}
// });

