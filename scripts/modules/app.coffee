require 'angular'
require 'angular-route'

module.exports = angular.module('app', ['ngRoute'])
    .controller('FooCtrl', require('../controllers/foo.coffee'))
    .controller('BarCtrl', require('../controllers/bar.coffee'))
    .config(['$routeProvider', ($routeProvider) ->
        $routeProvider
        .when('/foo', {
            templateUrl: 'views/foo.html'
            controller: 'FooCtrl'
        })
        .when('/bar', {
            templateUrl: 'views/bar.html'
            controller: 'BarCtrl'
        })
        .otherwise({
            redirectTo: '/foo'
        })
    ])