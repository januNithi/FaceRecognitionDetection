/**
 * Created by CSS on 22-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('kairosFaceRecognitionService',kairosFaceRecognitionService);

    kairosFaceRecognitionService.$inject = ['$window','$http','Upload']

    function kairosFaceRecognitionService($window,$http,Upload) {

        return {

            detectImage : function (image) {

                // return Upload.upload({
                //     url : '/kairosDetectImage',
                //     data: {files: image}
                // });
                return $http.post({
                    url : '/kairosEnrollImage',
                    data: {files: image}
                });

            },

        }

    }

})();