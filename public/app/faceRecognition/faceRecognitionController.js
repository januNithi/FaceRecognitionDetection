/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('faceRecognitionController',faceRecognitionController);

    faceRecognitionController.$inject = ['$scope','faceRecognitionService']

    function faceRecognitionController($scope,faceRecognitionService) {

        $scope.file = null;

        $scope.loadVideo = function (video) {

            videoUploadService.loadVideo(video).then(function (result) {
                console.log(JSON.stringify(result));
            });

        }

        $scope.compareImages = function () {
            videoUploadService.compareImages().then(function (response) {

                console.log(JSON.stringify(response));

            });
        };

    }

})();