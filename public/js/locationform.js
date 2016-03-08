
var app = angular.module("location-form", ['ngRoute']);

app.controller("LocationController", ["$http", "$rootScope", function($http, $rootScope){
    var controller = this;
    console.log($rootScope.user._id);
    var userID = $rootScope.user._id;
    $rootScope.addLocation = function(){
        console.log(this.name);
        $http.post("/user/" + userID + '/location', { name: this.name}).then(
            function(response){
                console.log("new location added")
            },
            function(err){
                console.log(err);
            });
    }
}])
