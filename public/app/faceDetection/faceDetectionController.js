/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('faceDetectionController',faceDetectionController);

    faceDetectionController.$inject = ['$scope','faceDetectionService','defaultProfilePicture']

    function faceDetectionController($scope,faceDetectionService,defaultProfilePicture) {

        $scope.file = defaultProfilePicture;

        $scope.spinner = false;

        $scope.faceDetected = null;

        $scope.loadImage = function (image) {

            $scope.file = image[0];

        };

        $scope.triggerUpload = function() {
            angular.element('#fileInput').trigger('click');
        };

        $scope.detectFace = function () {

            $scope.spinner = true;

            $scope.faceDetected = null;

            faceDetectionService.detectImage($scope.file).then(function (response) {

                if(response.data && response.data[0]) {

                    $scope.faceDetected = response.data[0].faceAttributes;

                }

                $scope.spinner = false;

            });
        };

    }

})();