/**
 * Created by CSS on 03-12-2016.
 */
module.exports = function (app) {

    var nodeFace = require('../controllers/nodeFaceDetector.server.controller');

    app.get('/nodeFaceDetector',nodeFace.detectFace);

};