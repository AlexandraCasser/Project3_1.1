
var app = angular.module("wineNot", ["ngRoute", "user-form", "location-form"]);


//this is the wineController
// + makes query to wineAPI
// + saves into array??
app.controller("WineController", ['$http', '$rootScope', '$location', function($http, $rootScope, $location){
    var controller = this;
    this.locations = [];
    this.searchdata = "";
    this.name = "This is the wine controller";
    this.wineResults = [];
    this.showDiv = false;
    this.message = "";
    var userID = $rootScope.user._id;
    this.wine = {};
    this.location_id = "";

    this.searchWine = function(){
       $http({
        method: 'POST',
        url: '/user/search',
        data: this.searchdata
       }).then(function(response){
            //returns input from searchbar
            console.log("This is the user search query", response.data)
            //this searches through wineAPI using user input in search bar (response.data)
            $http.get('https://services.wine.com/api/beta2/service.svc/JSON/catalog?apikey=5ec0a9229ceff7dfc8d442d2f2ad10b4&search=' + response.data)
                .then(function(response){
                 controller.wineResults = response.data.Products.List;
                 console.log(response.data.Products.List)
             })
       }), function(err){
        console.log(err)
       }
    }

    //this creates a pop up window for the user to select their location
    this.popUp = function(wine){
        console.log("this is the wine object you clicked on ", wine)
        controller.wine = wine;
        console.log("this is what controller.wine looks like : " , controller.wine)
        controller.message = "Choose the location you want to add to: ";
        controller.showDiv = !controller.showDiv
    }

    //this will send the location and wine name to server
    this.addWine = function(locationid){
        var userID = $rootScope.user._id;
        controller.location_id = locationid;
        console.log("this is controller.location_id: ", controller.location_id)
            
        $http.post('/user/' + userID + '/addwine', {locationid: controller.location_id, wine: controller.wine})
            .then(function(response){
                
                controller.message= "This has been added to your collection!"
              
            }),
            function(err){
                console.log(err)
            }
        //redirect back to home back
        $location.path('/user/' + userID);
    }

    this.close = function(){
        controller.showDiv = false;
    }

    //grab all the locations from the user, push it into the locations array []
    $http.get("/user/" + userID).then(function(response){

        //for each location in the array, push it to this.locations[]
        for (var i = 0; i < response.data.location.length; i++) {
            controller.locations.push(response.data.location[i])
            console.log(response.data.location[i])
        }
    })

}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'FormController',
            controllerAs: 'formCtrl'
        }).
        //FIGURE OUT SEARCH ROUTE FOR USER ID
        when('/search', { //when http://localhost:3000/url
            templateUrl: '/partials/searchwine.html', // render http://localhost:3000/partials/searchwine.html
            controller: 'WineController', // attach controller WineController
            controllerAs: 'wineCtrl' // alias for WineController (like ng-controller="Ctrl1 as ctrl")
        })
        .when('/user/:id', {
            templateUrl: 'partials/main.html',
            controller: 'FormController', 
            controllerAs: 'formCtrl'
    })
}]);

