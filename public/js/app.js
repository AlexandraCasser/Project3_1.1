
var app = angular.module("wineNot", ["ngRoute", "user-form"]);

//this is the mainController
// app.controller("MainController", ['$scope', '$http', function($http, $scope){
//     this.username = "";
//     this.locations = ["Example: Home", "Example: Warehouse", "Example: Florida Home"];
//     var controller = this;
//     this.id = "";

//     // $scope.$on("userInfo", function(eventObj, data){
//     //     controller.id = data;
//     //     console.log("HEY OMG I GOT THE ID!!", data)
//     // })

//         //once user is signed up, pull up user info immediately     
//     $http.get("/user/" + userID).then(function(response){
//         console.log("This is the response.data.username ", response.data.username);
//         console.log("This is the username through Scope", $scope.username);
//         controller.username = response.data.username;
//         console.log("This is dude Name", $rootScope.dudeName)
       
//     })
//                 //broadcast 

// }]);

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
        url: '/user/search',
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

