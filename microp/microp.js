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
            templateUrl : 'home.html'
        })
        .when('/ch1', {
            templateUrl : 'ch1-inst_set.html'
        })
        .when('/ch2', {
            templateUrl : 'ch2-assembler.html'
        })
        .when('/ch3', {
            templateUrl : 'ch3-hardware.html'
        })
        .when('/ch4', {
            templateUrl : 'ch4.html'
        })
        .when('/ch5', {
            templateUrl : 'ch5-pushpop.html'
        })
        .when('/ch6.1', {
            templateUrl : 'ch6-IO.html'
        })
        .when('/ch6', {
            templateUrl : 'ch6-polling.html'
        })
        .when('/ch10', {
            templateUrl : 'ch8-interrupt-intro.html'
        })
        .otherwise({
        redirectTo: 'home.html'
    });
});

