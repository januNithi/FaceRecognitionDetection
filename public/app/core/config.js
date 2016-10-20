/**
 * Created by CSS on 05-10-2016.
 */
(function () {
    angular.module('imgDetectApp').
    config(config);

    config.inject = ['$routeProvider', '$locationProvider']
    function config($routeProvider,$locationProvider) {
        $routeProvider.
            when('/',{
            templateUrl:'../app/home/home.html',
            controller : 'homeController'
        }).when('/faceDetection',{
            templateUrl:'../app/faceDetection/faceDetection.html',
            controller : 'faceDetectionController'
        }).when('/faceRecognition',{
            templateUrl:'../app/faceRecognition/faceRecognition.html',
            controller : 'faceRecognitionController'
        }).when('/videoRecognition',{
            templateUrl:'../app/VideoUpload/videoUpload.html',
            controller : 'videoUploadController'
        }).otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

    }
})();

