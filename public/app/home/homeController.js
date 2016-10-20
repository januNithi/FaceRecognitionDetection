/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('homeController',homeController);

    homeController.$inject = ['$scope','homeService']

    function homeController($scope,homeService) {

        $scope.file = null;

        $scope.openFaceDetection = function () {

            homeService.faceDetection();

        };

        $scope.openFaceRecognition = function () {

            homeService.faceRecognition();

        };

        $scope.openVideoRecognition = function () {

            homeService.videoRecognition();

        };
    }

})();