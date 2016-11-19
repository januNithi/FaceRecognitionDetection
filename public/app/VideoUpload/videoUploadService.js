/**
 * Created by CSS on 05-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('videoUploadService',videoUploadService);

    videoUploadService.$inject = ['$window','$http','Upload']

    function videoUploadService($window,$http,Upload) {

        return {

            loadVideo : function (image) {

                return Upload.upload({
                    url : '/videoToFrames',
                    data: {files: image[0]}
                });

            },

            compareImages : function () {
                return $http.get('/compareImages');
            }

        }

    }

})();