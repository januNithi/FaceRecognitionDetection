/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('faceDetectionController',faceDetectionController);

    faceDetectionController.$inject = ['$scope','faceDetectionService']

    function faceDetectionController($scope,faceDetectionService) {

        $scope.file = null;

        $scope.loadImage = function (image) {

            $scope.file = image[0];

        };

        $scope.detectFace = function () {
            faceDetectionService.detectImage($scope.file).then(function (response) {

                console.log(JSON.stringify(response));

            });
        };

    }

})();