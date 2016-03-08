
var app = angular.module("location-form", ['ngRoute']);

app.controller("LocationController", ["$http", "$rootScope", '$scope', function($http, $rootScope, $scope){
    // this.locations = $rootScope.user.location;
    // this.name ="TESTING";
    this.locations = [];
    var controller = this;
    // console.log($rootScope.user._id);
    var userID = $rootScope.user._id;
    
    // $rootScope.addLocation = function(){
    this.addLocation = function(){
        console.log(this.name);
        console.log($rootScope.user.location)
        $http.post("/user/" + userID + '/location', { name: this.name}).then(
            function(response){
                // console.log("This is the response", response.data.location)
                var allLocations = response.data.location;
                //push the most recent location into locations array
                controller.locations.push(response.data.location[allLocations.length - 1])
                // console.log("This is the controller locations array: ", controller.locations)
            },
            function(err){
                console.log(err);
            });
    }

    //grab all the locations from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

        //for each location in the array, push it to this.locations[]
        for (var i = 0; i < response.data.location.length; i++) {
            controller.locations.push(response.data.location[i])
            console.log(response.data.location[i])
        }
    })

    this.showEditDiv = false;
    this.showAddDiv = true;
    this.index = null;

    this.showEdit = function(index) {
        this.index = index;
        for  ( var i = 0; i < $rootScope.user.location.length; i++) {
            if (index == i) {
            this.showEditDiv = !this.showEditDiv;
            this.showAddDiv = !this.showAddDiv;
            }
        }
    }


    this.editLocation = function(index) {
        console.log($scope.locationCtrl.locations);

        // var locationID = $scope.$$childHead.location._id;
        var userID = $rootScope.user._id;
       
        // $http.put('/user/' + userID + '/' + locationID, { name : this.name}).then(function(response){
        //     console.log(response);

        // }, function(err){
        //     console.log(err);
        // });

        // this.showEditDiv = !this.showEditDiv;
        // this.showAddDiv = !this.showAddDiv;
        // this.name = undefined;
    }

}])
