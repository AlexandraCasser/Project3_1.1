
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

    this.deleteLocation = function(index){
        var userID = $rootScope.user._id;
        var locationID = $scope.locationCtrl.locations[index]._id;
        $http.delete('/user/' + userID + '/' + locationID).then(
            function(response){
                var allLocations = response.data.location;
                controller.locations.splice(response.data.location[allLocations.length - 1])
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
    $scope.index = null;

    this.showEdit = function(index) {
        $scope.index = index;
        this.showEditDiv = !this.showEditDiv;
        this.showAddDiv = !this.showAddDiv;
    }


    this.editLocation = function(index) {
        console.log(index);
        console.log($scope.locationCtrl.locations[index]._id);

        var locationID = $scope.locationCtrl.locations[index]._id;
        var userID = $rootScope.user._id;
       
        $http.put('/user/' + userID + '/' + locationID, { name : this.name}).then(function(response){
            console.log(response);
            $http.get("/user/" + userID).then(function(response){
            $scope.locationCtrl.locations[index].name = response.data.location[index].name;
            
        })

        }, function(err){
            console.log(err);
        });

        this.showEditDiv = !this.showEditDiv;
        this.showAddDiv = !this.showAddDiv;
        this.name = undefined;
    }


     this.addOneWine = function(){
         
            $scope.onHand ++;
            console.log($scope.onHand)
          }
        

}])
