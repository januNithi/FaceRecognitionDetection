/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('faceDetectionService',faceDetectionService);

    faceDetectionService.$inject = ['$window','$http','Upload']

    function faceDetectionService($window,$http,Upload) {

        return {

            detectImage : function (image) {

                return Upload.upload({
                    url : '/detectImage',
                    data: {files: image}
                });

            }

        }

    }

})();