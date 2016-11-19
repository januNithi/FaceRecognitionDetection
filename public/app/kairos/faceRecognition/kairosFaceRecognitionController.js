/**
 * Created by CSS on 22-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('kairosFaceRecognitionController',kairosFaceRecognitionController);

    kairosFaceRecognitionController.$inject = ['$scope','kairosFaceRecognitionService','defaultProfilePicture']

    function kairosFaceRecognitionController($scope,kairosFaceRecognitionService,defaultProfilePicture) {

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

            kairosFaceRecognitionService.detectImage($scope.file).then(function (response) {

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

            kairosFaceRecognitionService.detectImage($scope.file1).then(function (response) {

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

            kairosFaceRecognitionService.compareImages().then(function (response) {

                if(response.data ) {

                    $scope.faceIdentical = response.data.isIdentical;

                }

                $scope.spinner = false;

            });
        };

    }

})();