/**
 * Created by KO on 13.03.2015.
 */

$( document ).ready(function() {
    $('.tree-toggle').click(function () {
        $(this).parent().children('ul.tree').toggle(200);
    });
});
var microp = angular.module('microp', ['ngRoute']);

// configure our routes
microp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'ch1.html',
        })
        .when('/ch1', {
            templateUrl : 'ch1.html',
        })
        .when('/ch2', {
            templateUrl : 'ch2.html',
        })
        .when('/ch3', {
            templateUrl : 'ch3.html'
        })
        .when('/ch4', {
            templateUrl : 'ch4.html'
        })
        .when('/ch5', {
            templateUrl : 'ch5.html'
        })
        .otherwise({
        redirectTo: '/ch1.html'
    });
});

