/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('faceRecognitionService',faceRecognitionService);

    faceRecognitionService.$inject = ['$window','$http','Upload']

    function faceRecognitionService($window,$http,Upload) {

        return {

            detectImage : function (image) {

                return Upload.upload({
                    url : '/detectImage',
                    data: {files: image}
                });

            },

            compareImages : function (faceId,faceId1) {

                return $http.post('/recognizeFaces',[faceId,faceId1]);

            }

        }

    }

})();