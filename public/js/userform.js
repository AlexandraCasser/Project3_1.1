var app = angular.module('user-form', []);

app.controller('FormController',['$http', '$scope', function($http,$scope){
	var controller = this;
	this.name = null;
	this.password = null;

	this.addUser = function() {
		$http({
			method: 'POST',
			url: '/users/signup',
			data: this
		}).then(function(response){
			console.log(resonse.data);
			console.log($scope);
		},
		function(err){
			console.log(err);
		})
	}
}]);

app.directive('signupForm', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/userform.html',
		controller: 'FormController',
		controllerAs: 'formCtrl'
	}
});