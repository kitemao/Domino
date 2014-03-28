require.config({
    baseUrl: '/business',
    paths : {
        jQuery : '../components/jquery/jquery',
        _ : '../components/underscore/underscore',
        moment: '../components/moment/min/moment.min',
        angular : '../components/angular/angular',
        ngRouter : '../components/angular-route/angular-route',
        ngAnimate : '../components/angular-animate/angular-animate',
        ngResource : '../components/angular-resource/angular-resource',
        ngMock :     '../components/angular-mocks/angular-mocks',
        uiBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls',
        text : '../components/requirejs-text/text'
    },
    shim : {
        _ : {
            exports : '_'
        },
        angular : {
            deps : ['jQuery'],
            exports : 'angular'
        },
        ngRouter : {
            deps : ['angular', 'jQuery'],
            exports : 'ngRouter'
        },
        jQuery : {
            exports : 'jQuery'
        },
        ngAnimate : {
            deps : ['angular'],
            exports : 'ngAnimate'
        },
        ngResource : {
            deps : ['angular'],
            exports : 'ngResource'
        },
        ngMock : {
            deps : ['angular'],
            exports : 'ngMock'
        },
        uiBootstrap: {
            deps : ['angular'],
            exports : 'uiBootstrap'
        }
    }
});

(function (window) {
    define([
        'angular',
        'ngRouter',
        'ngAnimate',
        'ngResource',
        'uiBootstrap',

        'common/CommonModule',
        'main/mainModule',
        'projects/ProjectsModule',
        'utils/UtilsModule'
    ], function (
        angular
    ) {
        angular.module('domino', [
            'ngRoute', 'ngAnimate', 'ngResource', 'ui.bootstrap', 'dmnCommon', 'dmnMain', 'dmnProjects',
            'dmnUtils'
        ])

        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider

            .when('/', {

                templateUrl : '/business/projects/templates/list.html',
                controller : 'ProjectsListController'
            })

            .when('/projects', {

                templateUrl : '/business/projects/templates/list.html',
                controller : 'ProjectsListController'
            })

            .when('/projects/new', {

                templateUrl : '/business/projects/templates/edit.html',
                controller : 'ProjectsEditController'
            })

            .when('/projects/:title', {

                templateUrl : '/business/projects/templates/edit.html',
                controller : 'ProjectsEditController'
            })

            .when('/projects/task/:title', {

                templateUrl : '/business/projects/templates/task.html',
                controller : 'ProjectsTaskController'
            })

            .when('/projects/:title/hooks', {

                templateUrl : '/business/projects/templates/hookList.html',
                controller : 'ProjectsHookListController'
            })

            .when('/utils', {

                templateUrl : '/business/utils/templates/utils.html',
                controller : 'UtilsController'
            });
        }]);
    });
}(this));
