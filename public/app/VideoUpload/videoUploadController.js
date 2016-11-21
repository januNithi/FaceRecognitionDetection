/**
 * Created by CSS on 05-10-2016.
 */
(function () {
    
    angular.module('imgDetectApp').controller('videoUploadController',videoUploadController);
    
    videoUploadController.$inject = ['$scope','videoUploadService','profilePicturePath']
    
    function videoUploadController($scope,videoUploadService,profilePicturePath) {
     
        $scope.file = null;

        $scope.frames = [];

        $scope.showFrames = false;
        
        $scope.loadVideo = function (video) {
            
            videoUploadService.loadVideo(video).then(function (result) {
                // console.log(JSON.stringify(result));
                $scope.frames = result.data;
                $scope.showFrames = true;
            });
            
        };

        $scope.loadImage = function (image) {

            videoUploadService.loadImage(image).then(function (result) {

                // $scope.

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
            var a= img.split('/');
            return profilePicturePath+a[a.length-1];
        }
        
    }
    
})();