/**
 * Created by CSS on 05-10-2016.
 */


module.exports = function (app) {

    var upload = require('../controllers/VideoUpload.server.controller');

    app.post('/videoUpload',upload.uploadVideo);

    app.post('/detectImage',upload.detectImage);
    
    app.get('/compareImages',upload.compareImages);

}