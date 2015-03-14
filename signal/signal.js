/**
 * Created by KO on 14.03.2015.
 */
/**
 * Created by KO on 13.03.2015.
 */
/**
 * Created by KO on 11.03.2015.
 */
var signal = angular.module('signal', ['ngRoute']);

// configure our routes
signal.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'welcome.html'
        })
        .when('/ch1', {
            templateUrl : 'ch1.html'
        })
        .when('/ch2', {
            templateUrl : 'ch2.html'
        })
        .when('/ch3', {
            templateUrl : 'ch3.html'
        })
        .when('/ch4', {
            templateUrl : 'ch4.html'
        })
        .when('/ch5', {
            templateUrl : 'ch5.html'
        });
});