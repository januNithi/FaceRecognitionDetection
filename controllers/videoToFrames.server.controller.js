/**
 * Created by CSS on 07-11-2016.
 */

var ffmpeg = require('ffmpeg');
var multer = require('multer');
var fs = require('fs');

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
                    number : 5,
                    file_name : 'my_frame_%t_%s'
                }, function (error, files) {
                    if (!error) {
                        // console.log('Frames: ' + files);
                        // files.forEach(function (value,index) {
                        console.log(files);
                        var fileList = files;
                        fileList.forEach(function (value, index) {
                            var path = value.split('/');
                            faceClient.face.detect({
                                url: 'public/uploads/frames/' + path[path.length - 1],
                                analyzesAge: true,
                                analyzesGender: true,
                                returnFaceId: true

                            }).then(function (response) {
                                if (response && response.lemgth > 0) {
                                    var obj = {
                                        path: value,
                                        faceId: response[0].faceId,
                                        faceAttributes: response[0].faceAttributes,
                                        faceRectangle: response[0].faceRectangle
                                    };
                                    responseData.push(obj);
                                    if ((index + 1) == fileList.length) {
                                        response.send(responseData);
                                    }
                                }

                            }, function (error) {
                                console.log('error' + error);
                                res.send(500,{error:error});
                            });
                        });
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