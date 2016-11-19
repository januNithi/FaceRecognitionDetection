/**
 * Created by CSS on 26-10-2016.
 */
module.exports = function (app) {

    var upload = require('../controllers/skyBiometryAPI.server.controller');

    // app.post('/kairsoDetectImage',upload.detectImage);
    //
    // app.post('/kairosRecognizeFaces',upload.recognizeFaces);

    app.get('/skyFaceDetect',upload.detectImage);

    app.get('/faceRecognize',upload.faceRecognize);
    //
    // app.post('/kairosRecognizeImages',upload.recognize);

}