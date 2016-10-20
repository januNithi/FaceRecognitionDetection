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
                    url : '/videoUpload',
                    data: {files: image}
                });

            },

            compareImages : function () {
                return $http.get('/compareImages');
            }

        }

    }

})();