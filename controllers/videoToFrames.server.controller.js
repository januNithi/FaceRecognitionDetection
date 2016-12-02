/**
 * Created by CSS on 07-11-2016.
 */

var ffmpeg = require('ffmpeg');
var multer = require('multer');
var fs = require('fs');
var child_process = require('child_process');


var unirest = require('unirest');
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
        var path = 'public/uploads/'+file.originalname;
        req.session.videoUpload = path;
    }
});


var upload = multer({ //multer settings
    storage: storage
}).single('files');

exports.convertToFrames = function (req,res) {

    var responseData = [];

    upload(req,res,function (err) {
        if(err){
            res.send(500,{error:err});
        }
        try {
            var process = new ffmpeg(req.session.videoUpload);
            var fileList = fs.readdirSync('public/uploads/frames');
            if(fileList && fileList.length > 0) {
                for (var i = 0; i < fileList.length; i++) {
                    var filePath = 'public/uploads/frames/' + fileList[i];
                    if (fs.statSync(filePath).isFile())
                        fs.unlinkSync(filePath);
                    else
                        rmDir(filePath);
                }
            }
            process.then(function (video) {
                // Callback mode
                video.fnExtractFrameToJPG('public/uploads/frames', {
                    frame_rate : 1,
                    number : 15,
                    file_name : 'my_frame'
                }, function (error, files) {
                    if (!error) {
                        // console.log('Frames: ' + files);
                        // files.forEach(function (value,index) {
                        //console.log(files);
                       res.send(files);

                    }else{
                        console.log('error' + error);
                        res.send(500,{error:error});
                    }

                        // });
                        // res.send(files);
                });
            }, function (err) {
                console.log('Error: ' + err);
                res.send(500,{error:err});
            });
        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
            res.send(500,{error:e});
        }
    });


};

exports.getFramesContainingFaces = function (req,res) {
    var facesData = [];
    var errorData = [];
    var receivedData = req.body.face;
    var i = 0;
    receivedData.forEach(function (value,index) {
        var pathName = value;
        var path = pathName.split('/');
        faceClient.face.detect({
            url: 'http://ec2-54-187-235-177.us-west-2.compute.amazonaws.com:3000/uploads/frames/' + path[path.length - 1],
            analyzesAge: true,
            analyzesGender: true,
            returnFaceId: true

        }).then(function (response) {
            i++;
            if (response && response.length > 0) {
                var obj = {
                    path: pathName,
                    faceId: response[0].faceId,
                    faceAttributes: response[0].faceAttributes,
                    faceRectangle: response[0].faceRectangle
                };
                facesData.push(obj);

                if((i + 1) == receivedData.length){
                    res.send(facesData);
                }
            }
        }, function (error) {
            i++;
            console.log('error' + error);
            errorData.push(error);
            if((i + 1) == receivedData.length) {
                res.send(500, {error: errorData});
            }
        });

    });

};

exports.loadImage = function (req,res) {
    upload(req,res,function (err) {
        if (err) {
            res.send(500, {error: err});
        }
        var path = req.session.videoUpload.split('/');
        faceClient.face.detect({
            url: 'http://ec2-54-187-235-177.us-west-2.compute.amazonaws.com:3000/uploads/' + path[path.length - 1],
            analyzesAge: true,
            analyzesGender: true,
            returnFaceId: true

        }).then(function (response) {

            if (response && response.length > 0) {
                var obj = {
                    path: req.session.videoUpload,
                    faceId: response[0].faceId,
                    faceAttributes: response[0].faceAttributes,
                    faceRectangle: response[0].faceRectangle
                };
                res.send(obj);
            }
        }, function (error) {
            res.send(500, {error: error});
        });
    });
};

exports.getFramesRecognized = function (req,res) {
    var facesData = [];
    var errorData = [];
    var receivedData = req.body;
    var origImg = req.query.img;
    var i = 0;
    receivedData.forEach(function (value,index) {

        faceClient.face.verify(
            [value.faceId,origImg]
        ).then(function (response) {
            i++;
            var obj = {
                value : value,
                match : response
            }
            facesData.push(obj);
            if((i+1) == receivedData.length){
                res.send(facesData);
            }
        },function (error) {
            i++;
            errorData.push(error);
            if((i+1) == receivedData.length){
                res.send(500,{error:errorData});
            }
        });
    });
};
