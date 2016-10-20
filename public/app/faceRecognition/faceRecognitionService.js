/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('faceRecognitionService',faceRecognitionService);

    faceRecognitionService.$inject = ['$window','$http','Upload']

    function faceRecognitionService($window,$http,Upload) {

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