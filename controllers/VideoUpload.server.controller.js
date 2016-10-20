/**
 * Created by CSS on 05-10-2016.
 */


var multer = require('multer');

var ffmpeg = require('ffmpeg');

var unirest = require('unirest');

var fs = require('fs');

var value = 0;

var oxford = require('project-oxford'),
    faceClient = new oxford.Client('b42161df7cf54dc89c4968c166c0bc63'),
    videoClient = new oxford.Client('fccc1426d91b47498682f3aebe06fb50');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("req.body" + req.body.file);
        cb(null, file.originalname);
        //
        var path = 'http://localhost:3000/uploads/'+file.originalname;

        // videoClient.video.trackFace({
        //     url : 'https://youtu.be/Dz_8RoyNs60'
        // }).then(function (response) {
        //    console.log(JSON.stringify(response));
        // },function (error) {
        //     console.log(JSON.stringify(error));
        // });

        faceClient.face.detect({
            url: 'http://www.behindwoods.com/hindi-tamil-galleries/kamal-haasan/kamal-haasan-01.jpg',
            analyzesAge: true,
            analyzesGender: true,
            returnFaceId : true
        }).then(function (response) {
            console.log('The age is: ' + response[0].faceAttributes.age);
            console.log('The gender is: ' + response[0].faceAttributes.gender);

            req.session.faceId = [];
            req.session.faceId.push(response[0].faceId);
            faceClient.face.detect({
                url: 'http://www.thehindu.com/multimedia/dynamic/02536/06CP_Sivakarthikey_2536872g.jpg',
                analyzesAge: true,
                analyzesGender: true,
                returnFaceId: true
            }).then(function (response) {
                console.log('The age is: ' + response[0].faceAttributes.age);
                console.log('The gender is: ' + response[0].faceAttributes.gender);

                req.session.faceId.push(response[0].faceId);

                faceClient.face.verify(
                    req.session.faceId
                ).then(function (response) {

                    if(response.isIdentical){
                        console.log("Images are Identical");
                    }else{
                        console.log("Image doesnt match");
                    }

                });

            });
        });
    }
});

var storageToDetect = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("req.body" + req.body.file);
        cb(null, file.originalname);
        //
        var path = 'http://192.168.1.95:3000/public/uploads/'+file.originalname;

        faceClient.face.detect({
            url: path,
            analyzesAge: true,
            analyzesGender: true,
            returnFaceId: true

        }).then(function (response) {
            console.log('The age is: ' + response[0].faceAttributes.age);
            console.log('The gender is: ' + response[0].faceAttributes.gender);

            req.session.face = [];
            req.session.face = response;
        },function (error) {
            console.log('error'+error);
        });
    }
});

var upload = multer({ //multer settings
    storage: storage
}).any();

var uploadToDetect = multer({ //multer settings
    storage: storageToDetect
}).single('files');

exports.uploadVideo = function (req,res) {

    upload(req,res,function (err,response) {
        if(err) {
            res.send(500, {error: err});
        }
        res.send(response);
    });
    
};

exports.detectImage = function (req,res) {

    uploadToDetect(req,res,function (err,response) {
        if(err) {
            res.send(500, {error: err});
        }
        res.send(req.session);
    });

};

exports.compareImages = function (req,res) {
    client.face.verify(
        req.session.faceId
    ).then(function (response) {
        req.session = null;
        console.log('The age is: ' + response[0].faceAttributes.age);
        console.log('The gender is: ' + response[0].faceAttributes.gender);

    });
};