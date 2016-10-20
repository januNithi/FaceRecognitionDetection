/**
 * Created by CSS on 05-10-2016.
 */

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var morgan = require('morgan');

var session = require('express-session')

module.exports = function () {

    var app = express();

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb'}));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))

    app.use(express.static('./public'));

    require('../routes/VideoUpload.server.route')(app);


    //layout
    require('../routes/layout.server.route')(app);

    return app;

};
