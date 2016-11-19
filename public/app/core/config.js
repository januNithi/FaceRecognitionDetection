/**
 * Created by CSS on 05-10-2016.
 */
(function () {
    angular.module('imgDetectApp').
    config(config);
    angular.module('imgDetectApp').constant('defaultProfilePicture', 'images/selectIcon.png');
    angular.module('imgDetectApp').constant('profilePicturePath', 'uploads/frames/');
    config.inject = ['$routeProvider', '$locationProvider']
    function config($routeProvider, $locationProvider) {
        $routeProvider.
            when('/',{
            templateUrl:'../app/home/home.html',
            controller : 'homeController'
        }).when('/faceDetection',{
            templateUrl:'../app/microsoft/faceDetection/faceDetection.html',
            controller : 'faceDetectionController'
        }).when('/faceRecognition',{
            templateUrl:'../app/microsoft/faceRecognition/faceRecognition.html',
            controller : 'faceRecognitionController'
        }).when('/videoRecognition',{
            templateUrl:'../app/VideoUpload/videoUpload.html',
            controller : 'videoUploadController'
        }).when('/kairosHome',{
            templateUrl:'../app/kairos/home/home.html',
            controller : 'kairosHomeController'
        }).when('/kairosFaceDetection',{
            templateUrl:'../app/kairos/faceDetection/faceDetection.html',
            controller : 'kairosFaceDetectionController'
        }).when('/kairosFaceRecognition',{
            templateUrl:'../app/kairos/faceRecognition/faceRecognition.html',
            controller : 'kairosFaceRecognitionController'
        }).otherwise({
            redirectTo: '/'
        });


        $locationProvider.html5Mode(true);

    }
})();

