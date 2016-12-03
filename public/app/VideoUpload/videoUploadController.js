/**
 * Created by CSS on 05-10-2016.
 */
(function () {
    
    angular.module('imgDetectApp').controller('videoUploadController',videoUploadController);
    
    videoUploadController.$inject = ['$scope','$interval','videoUploadService','profilePicturePath','defaultProfilePicture']
    
    function videoUploadController($scope,$interval,videoUploadService,profilePicturePath,defaultProfilePicture) {

        $scope.file = defaultProfilePicture;

        $scope.data = [];

        $scope.frames = [];

        $scope.faceDetectedFrames = [];
        $scope.faceNotDetected = [];
        $scope.facesRecognized = [];
        $scope.limit = 90;
        $scope.limitEnd = 0;

        $scope.spinner = false;

        $scope.showFrames = false;
        
        $scope.loadVideo = function (video) {

            $scope.spinner = true;

            videoUploadService.loadVideo(video).then(function (result) {
                // console.log(JSON.stringify(result));
                $scope.frames = result.data;
                $scope.showFrames = true;

                $scope.spinner = false;
            },function (error) {

                $scope.error = error;

                $scope.spinner = false;

            });
            
        };

        $scope.showOriginalImage = function () {

            return $scope.file;

        };

        $scope.detectFaces = function () {
            $scope.spinner = true;
            $scope.faceDetectedFrames = [];
            $scope.faceNotDetected = [];
            $scope.limitEnd = 90;
            $scope.data = [];
            $scope.sendDataToDetectFace();
            // angular.forEach($scope.frames,function (value,index) {
            //
            //     $interval($scope.sendDataToDetectFace(value),600,1);
            //
            //     if((index+1) == $scope.frames.length){
            //         $scope.spinner = false;
            //     }
            //
            // });


        };

        $scope.sendDataToDetectFace = function () {
            videoUploadService.detectFaces($scope.frames).then(function (result) {
                // console.log(JSON.stringify(result));
                // if(result.data == 'NotFound'){
                //
                // }else {

                $scope.faceDetectedFrames = result.data;
                // }
                $scope.spinner = false;
                // if($scope.limitEnd<$scope.frames){
                //     var startLimit = $scope.limitEnd;
                //     $scope.limitEnd = $scope.limitEnd + $scope.limit;
                //     angular.forEach($scope.frames,function (value,index) {
                //         if((index + 1) > startLimit && (index + 1) <= $scope.limitEnd){
                //             $scope.data.push(value);
                //         }
                //         if((index + 1) == $scope.limitEnd){
                //             $scope.sendDataToDetectFace();
                //         }
                //
                //     });
                // }else{

                // }
            },function (error) {

                $scope.error = error;

                $scope.spinner = false;

            });
        };

        $scope.triggerUpload = function() {
            angular.element('#fileImageInput').trigger('click');
        };

        $scope.recognizeFaces = function () {

            $scope.spinner = true;

            videoUploadService.recognizeFaces($scope.faceDetectedFrames,$scope.originalFaceDetected.faceId).then(function (result) {

                $scope.facesRecognized = result.data;

                $scope.spinner = false;

            },function (error) {

                $scope.error = error;

                $scope.spinner = false;

            });

        };

        $scope.loadImage = function (image) {

            $scope.file = image[0];
            
            videoUploadService.loadImage(image).then(function (result) {

                $scope.originalFaceDetected = result.data;

            },function (error) {
                $scope.error = error;

                $scope.spinner = false;
            });

        };

        $scope.compareImages = function () {
            videoUploadService.compareImages().then(function (response) {

                console.log(JSON.stringify(response));

            },function (error) {

                $scope.error = error;

            });
        };
        
        $scope.showImages = function (img) {
            if(img){
                var imgArr= img.split('/');
            }else{
                console.log(img);
            }

            return profilePicturePath+imgArr[imgArr.length-1];
        }
        
    }
    
})();