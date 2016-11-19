/**
 * Created by CSS on 24-10-2016.
 */
(function () {

    angular.module('imgDetectApp').controller('kairosHomeController',kairosHomeController);

    kairosHomeController.$inject = ['$scope','kairosHomeService','defaultProfilePicture']

    function kairosHomeController($scope,kairosHomeService,defaultProfilePicture) {

        $scope.file = null;
        $scope.showFaceDetection = false;
        $scope.showFaceRecognition = false;
        $scope.showVideoRecognition = false;


        $scope.openFaceDetection = function () {

            $scope.showFaceDetection = true;
            $scope.showFaceRecognition = false;
            $scope.showVideoRecognition = false;

        };

        $scope.openFaceRecognition = function () {

            $scope.showFaceDetection = false;
            $scope.showFaceRecognition = true;
            $scope.showVideoRecognition = false;

        };

        $scope.openVideoRecognition = function () {

            $scope.showFaceDetection = false;
            $scope.showFaceRecognition = false;
            $scope.showVideoRecognition = true;

        };
        
        $scope.showActive = function (value) {

            var returnValue = false;

            if(value == 'faceDetect'){
                if($scope.showFaceDetection){
                    returnValue = true;
                }
            }
            if(value == 'faceRecognize'){
                if($scope.showFaceRecognition){
                    returnValue = true;
                }
            }
            if(value == 'videoRecognize'){
                if($scope.showVideoRecognition){
                    returnValue = true;
                }
            }

            return returnValue;
            
        };

        $scope.triggerUpload = function(value) {
            if(value == 'faceDetect'){
                angular.element('#faceDetectInput').trigger('click');
            }
            if(value == 'faceRecognize'){
                if($scope.showFaceRecognition){
                    returnValue = true;
                }
            }
            if(value == 'videoRecognize'){
                if($scope.showVideoRecognition){
                    returnValue = true;
                }
            }
        };

        //Face Detection *****Code Begins******//

        $scope.faceDetectImage = defaultProfilePicture;

        $scope.spinner = false;

        // $scope.

        $scope.faceDetected = null;

        $scope.loadImage = function (image) {

            $scope.faceDetectImage = image[0];

            $scope.spinner = true;

            $scope.faceDetected = null;

            kairosHomeService.detectImage($scope.faceDetectImage).then(function (response) {

                if(response.data && response.data.body.images && response.data.body.images[0]) {

                    $scope.faceDetected = {
                        gender : (response.data.body.images[0].attributes.gender.type == 'M')?'Male':'Female',
                        face_id : response.data.body.images[0].transaction.face_id,
                        gallery_name : response.data.body.images[0].transaction.gallery_name,
                        subject_id : response.data.body.images[0].transaction.subject_id
                    }

                }

                $scope.spinner = false;

            });
        };


        $scope.detectFace = function () {

            $scope.spinner = true;

            $scope.faceDetected = null;

            kairosHomeService.detectImage($scope.file).then(function (response) {

                if(response.data && response.data[0]) {

                    $scope.faceDetected = response.data[0].faceAttributes;

                }

                $scope.spinner = false;

            });
        };

        // *****Code Ends******//

        //Face Recognition *** Code Begins ****//
        $scope.file = defaultProfilePicture;
        $scope.file1 = defaultProfilePicture;

        $scope.spinner = false;

        $scope.faceIdentical = false;

        $scope.faceDetected = null;
        $scope.faceDetected1 = null;

        // $scope.loadImage = function (image) {
        //
        //     $scope.file = image[0];
        //
        //     $scope.spinner = true;
        //
        //     $scope.faceDetected = null;
        //
        //     kairosHomeService.detectImage($scope.file).then(function (response) {
        //
        //         if(response.data && response.data[0]) {
        //
        //             $scope.faceDetected = response.data[0];
        //
        //         }
        //
        //         $scope.spinner = false;
        //
        //     });
        //
        // };

        $scope.loadImage1 = function (image) {

            $scope.file1 = image[0];

            $scope.spinner = true;

            $scope.faceDetected1 = null;

            kairosHomeService.detectImage($scope.file1).then(function (response) {

                if(response.data && response.data[0]) {

                    $scope.faceDetected1 = response.data[0];

                }

                $scope.spinner = false;

            });

        };

        // $scope.triggerUpload = function() {
        //     angular.element('#loadInput').trigger('click');
        // };
        // $scope.triggerUpload1 = function() {
        //     angular.element('#fileInput1').trigger('click');
        // };

        $scope.compareFaces = function () {

            $scope.spinner = true;

            kairosHomeService.compareImages().then(function (response) {

                if(response.data ) {

                    $scope.faceIdentical = response.data.isIdentical;

                }

                $scope.spinner = false;

            });
        };


        // *****Code Ends******//

    }

})();