/**
 * Created by CSS on 22-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('kairosFaceDetectionService',kairosFaceDetectionService);

    kairosFaceDetectionService.$inject = ['$window','$http','Upload']

    function kairosFaceDetectionService($window,$http,Upload) {

        return {

            detectImage : function (image) {

                return Upload.upload({
                    url : '/kairosDetectImage',
                    data: {files: image}
                });

            }

        }

    }

})();