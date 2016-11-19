/**
 * Created by CSS on 24-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('kairosHomeService',kairosHomeService);

    kairosHomeService.$inject = ['$window','$http','Upload']

    function kairosHomeService($window,$http,Upload) {

        return {

            //Face Detection *****Code Begins****//

            detectImage : function (image) {

                return Upload.upload({
                    url : '/kairosEnrollImage',
                    data: {files: image}
                });

            },

            //Face Detection *****Code Ends****//

            compareImages : function () {
                return $http.post('/kairosRecognizeImages');
            },

            faceDetection : function (image) {
                $window.location.href = '/kairosFaceDetection';
            },

            faceRecognition : function () {
                $window.location.href = '/kairosFaceRecognition';
            },

            videoRecognition : function () {
                $window.location.href = '/videoRecognition';
            }

        }

    }

})();