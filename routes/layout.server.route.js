/**
 * Created by CSS on 05-10-2016.
 */
module.exports = function (app) {
  
    var layout = require('../controllers/layout.server.controller');

    app.get('*',layout.layout);
    
};