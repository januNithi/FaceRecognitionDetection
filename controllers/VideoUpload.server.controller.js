/**
 * Created by CSS on 05-10-2016.
 */


var multer = require('multer');

var ffmpeg = require('ffmpeg');

var unirest = require('unirest');

var fs = require('fs');

//var gm = require('gm').subClass({imageMagick: true});

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
        var path = 'http://ec2-54-244-76-229.us-west-2.compute.amazonaws.com:3000/uploads/'+file.originalname;

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
        var path = 'http://ec2-54-244-76-229.us-west-2.compute.amazonaws.com:3000/uploads/'+file.originalname;
        req.session.facePath = path;

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
        faceClient.face.detect({
            url: req.session.facePath,
            analyzesAge: true,
            analyzesGender: true,
            returnFaceId: true

        }).then(function (response) {
            // console.log('The age is: ' + response[0].faceAttributes.age);
            // console.log('The gender is: ' + response[0].faceAttributes.gender);

            // var pic = gm("http://www.thehindu.com/multimedia/dynamic/02536/06CP_Sivakarthikey_2536872g.jpg")
            //     .drawRectangle(response[0].faceRectangle.height, response[0].faceRectangle.left,
            //         response[0].faceRectangle.top,response[0].faceRectangle.width);
            // pic.write('t.png', function (err,response) {
            //     if ( err ) throw err;
            //     res.send(response);
            // });
            res.send(response);

        },function (error) {
            console.log('error'+error);
        });
    });

};

exports.recognizeFaces = function (req,res) {
    faceClient.face.verify(
        req.body
    ).then(function (response) {
        req.session = null;

    });
}

exports.compareImages = function (req,res) {
    client.face.verify(
        req.session.faceId
    ).then(function (response) {
        res.send(response);

    });
};