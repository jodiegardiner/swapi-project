angular.module('sQuery', ['ngRoute', 'RouteControllers']);
 
angular.module('sQuery').config(function($routeProvider) {
 
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .when('/people', {
        templateUrl: 'people.html',
        controller: 'HomeController'
    })
    .when('/vehicles', {
        templateUrl: 'vehicles.html',
        controller: 'HomeController'
    })
    .when('/ships', {
        templateUrl: 'ships.html',
        controller: 'HomeController'
    })
    .when('/about', {
        templateUrl: 'crawl.html',
        controller: 'HomeController'
    })

    ;
});