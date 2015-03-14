/**
 * Created by KO on 11.03.2015.
 */
var homeApp = angular.module('homeApp', ['ngRoute']);

// configure our routes
homeApp.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'welcome.html'
        })

        .when('/microp', {
            templateUrl : 'pages/microp.html'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html'
            //controller  : 'contactController'
        });
});