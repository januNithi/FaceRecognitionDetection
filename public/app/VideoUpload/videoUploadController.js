/**
 * Created by CSS on 05-10-2016.
 */
(function () {
    
    angular.module('imgDetectApp').controller('videoUploadController',videoUploadController);
    
    videoUploadController.$inject = ['$scope','videoUploadService']
    
    function videoUploadController($scope,videoUploadService) {
     
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