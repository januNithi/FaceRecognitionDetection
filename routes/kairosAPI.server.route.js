/**
 * Created by CSS on 24-10-2016.
 */

module.exports = function (app) {

    var upload = require('../controllers/kairosAPI.server.controller');

    // app.post('/kairsoDetectImage',upload.detectImage);
    //
    // app.post('/kairosRecognizeFaces',upload.recognizeFaces);

    app.post('/kairosFaceDetect',upload.detectImage);

    app.post('/kairosEnrollImage',upload.enrollImage);

    app.post('/kairosRecognizeImages',upload.recognize);

}