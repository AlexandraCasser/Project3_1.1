var app = angular.module("wineNot", ["ngRoute"]);

//this is the mainController
app.controller("MainController", ['$http', function($http){
    this.name = "Welcome back, USERNAME";
    this.locations = ["Example: Home", "Example: Warehouse", "Example: Florida Home"]
}]);

//this is the wineController
// + makes query to wineAPI
// + saves into array??
app.controller("WineController", ['$http', function($http){
    var controller = this;
    this.searchdata = "";
    this.name = "This is the wine controller";
    this.wineResults = [];

    this.searchWine = function(){
       $http({
        method: 'POST',
        url: '/search',
        data: this.searchdata
       }).then(function(response){
            //returns input from searchbar
            console.log("This is the user search query", response.data)
            //this searches through wineAPI using user input in search bar (response.data)
            $http.get('http://services.wine.com/api/beta2/service.svc/JSON/catalog?apikey=5ec0a9229ceff7dfc8d442d2f2ad10b4&search=' + response.data)
                .then(function(response){
                 controller.wineResults = response.data.Products.List;
                 console.log(response.data.Products.List)
             })
       }), function(err){
        console.log(err)
       }
    }
}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true }); // tell angular to use push state
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        }).
        when('/search', { //when http://localhost:3000/url
            templateUrl: '/partials/searchwine.html', // render http://localhost:3000/partials/searchwine.html
            controller: 'WineController', // attach controller WineController
            controllerAs: 'wineCtrl' // alias for WineController (like ng-controller="Ctrl1 as ctrl")
        })
}]);