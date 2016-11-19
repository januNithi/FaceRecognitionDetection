/**
 * Created by CSS on 05-10-2016.
 */

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var morgan = require('morgan');

var session = require('express-session');

var RateLimit = require('express-rate-limit');

module.exports = function () {

    var app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb'}));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

    var limiter = new RateLimit({
        windowMs: 30*1000, // 15 minutes
        max: 10000, // limit each IP to 100 requests per windowMs
        delayMs: 0 // disable delaying - full speed until the max limit is reached
    });

    app.set('trust proxy', 1) // trust first proxy

    app.use(limiter);

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))

    app.use(express.static('./public'));

    require('../routes/skyBiometryAPI.server.route')(app);
    require('../routes/cloudSightAPI.server.route')(app);
    require('../routes/clarifaiAPI.server.route')(app);
    require('../routes/VideoUpload.server.route')(app);
    require('../routes/kairosAPI.server.route')(app);
    require('../routes/videoToFrames.server.route')(app);

    //layout
    require('../routes/layout.server.route')(app);

    return app;

};
