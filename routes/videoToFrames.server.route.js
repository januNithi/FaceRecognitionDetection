/**
 * Created by CSS on 07-11-2016.
 */
module.exports = function (app) {

    var videoToFrames = require('../controllers/videoToFrames.server.controller');

    app.post('/videoToFrames',videoToFrames.convertToFrames);

};