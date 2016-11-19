/**
 * Created by CSS on 20-10-2016.
 */
(function () {

    angular.module('imgDetectApp').factory('homeService',homeService);

    homeService.$inject = ['$window','$http']

    function homeService($window,$http,Upload) {

        return {

            faceDetection : function (image) {
                $window.location.href = '/faceDetection';
            },

            faceRecognition : function () {
                $window.location.href = '/faceRecognition';
            },

            videoRecognition : function () {
                $window.location.href = '/videoRecognition';
            },

            openKairosHome : function () {
                $window.location.href = '/openKairos';
            }

        }

    }

})();