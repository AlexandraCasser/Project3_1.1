var app = angular.module('user-form', ['ngRoute']);

app.controller('FormController',['$http', '$scope', '$location', '$rootScope', function($http,$scope, $location, $rootScope){ //location changes the hash values in the url
	var controller = this;
	this.name = null;
	this.password = null;


	$scope.addUser = function() {
		console.log('WORKING');
		this.signupName = $scope.signupName;
		this.signupPassword = $scope.signupPassword;

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
		$location.path('/user'); //will change the URL hash value to to /root/user ... same as window.location.hash = '#/user' ... no hash needed, b/c 'path' automatically knows we're working with angular	
	};

	$scope.loginUser = function() {
		console.log('WORKING!!!');
		//run an http get here and see if it matches any user name or passwords?
	//$rooteScope is a super global variable ... attaches all of your properties to a global object
		if ($scope.username == 'John' && $scope.password == 'John') {
			$rootScope.loggedIn = true;
			$location.path('/user'); 	
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
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({ enabled: true});
	$routeProvider.when('/', {
		templateUrl: 'partials/userform.html',
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

// app.directive('loginForm', function(){
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'partials/userloginform.html',
// 		controller: 'FormController',
// 		controllerAs: 'formCtrl'
// 	}
// });

