/**
 * Created by KO on 11.03.2015.
 */
var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/welcome', {
            templateUrl : 'welcome.html'
            //controller  : 'mainController'
        })

        // route for the about page
        .when('/microp', {
            templateUrl : 'pages/microp.html'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html'
            //controller  : 'contactController'
        });
});