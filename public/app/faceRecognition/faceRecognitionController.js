/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('faceRecognitionController',faceRecognitionController);

    faceRecognitionController.$inject = ['$scope','faceRecognitionService','defaultProfilePicture']

    function faceRecognitionController($scope,faceRecognitionService,defaultProfilePicture) {

        $scope.file = defaultProfilePicture;
        $scope.file1 = defaultProfilePicture;

        $scope.spinner = false;
        
        $scope.faceIdentical = false;

        $scope.faceDetected = null;
        $scope.faceDetected1 = null;
        
        $scope.loadImage = function (image) {

            $scope.file = image[0];

            $scope.spinner = true;

            $scope.faceDetected = null;

            faceRecognitionService.detectImage($scope.file).then(function (response) {

                if(response.data && response.data[0]) {

                    $scope.faceDetected = response.data[0];

                }

                $scope.spinner = false;

            });

        };

        $scope.loadImage1 = function (image) {

            $scope.file1 = image[0];

            $scope.spinner = true;

            $scope.faceDetected1 = null;

            faceRecognitionService.detectImage($scope.file1).then(function (response) {

                if(response.data && response.data[0]) {

                    $scope.faceDetected1 = response.data[0];

                }

                $scope.spinner = false;

            });

        };

        $scope.triggerUpload = function() {
            angular.element('#fileInput').trigger('click');
        };
        $scope.triggerUpload1 = function() {
            angular.element('#fileInput1').trigger('click');
        };

        $scope.compareFaces = function () {

            $scope.spinner = true;

            faceRecognitionService.compareImages($scope.faceDetected.faceId,$scope.faceDetected1.faceId).then(function (response) {

                if(response.data ) {

                    $scope.faceIdentical = response.data.isIdentical;

                }

                $scope.spinner = false;

            });
        };

    }

})();