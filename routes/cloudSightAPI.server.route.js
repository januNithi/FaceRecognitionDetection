/**
 * Created by CSS on 26-10-2016.
 */

module.exports = function (app) {

    var upload = require('../controllers/cloudSightAPI.server.controller');

    // app.post('/kairsoDetectImage',upload.detectImage);
    //
    // app.post('/kairosRecognizeFaces',upload.recognizeFaces);

    app.get('/cloudSightFaceDetect',upload.detectImage);

    // app.get('/recognizeImages',upload.recognizeImages);
    //
    // app.post('/kairosRecognizeImages',upload.recognize);

}

