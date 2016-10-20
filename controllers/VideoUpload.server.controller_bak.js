/**
 * Created by CSS on 17-10-2016.
 */


var multer = require('multer');

var ffmpeg = require('ffmpeg');

var oxford = require('project-oxford'),
    client = new oxford.Client('a4f3b9e5-db07-466d-9274-11ea8eb88653');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("req.body" + req.body.file);
        cb(null, file.fieldname + '-' + file.originalname);
        //
        var path = 'http://localhost:3000/public/uploads/'+file.fieldname + '-' + file.originalname;

        // try {
        //     var process = new ffmpeg(path);
        //     process.then(function (video) {
        //         // Video metadata
        //         console.log(video.metadata);
        //         // FFmpeg configuration
        //         console.log(video.info_configuration);
        //     }, function (err) {
        //         console.log('Error: ' + err);
        //     });
        // } catch (e) {
        //     console.log(e.code);
        //     console.log(e.msg);
        // }
        // try {
        //     var process = new ffmpeg(path);
        //     process.then(function (video) {
        //         // Callback mode
        //         video.fnExtractFrameToJPG('public/uploads/frames', {
        //             frame_rate : 1,
        //             number : 5,
        //             file_name : 'my_frame_%t_%s'
        //         }, function (error, files) {
        //             if (!error)
        //                 console.log('Frames: ' + files);
        //         });
        //     }, function (err) {
        //         console.log('Error: ' + err);
        //     });
        // } catch (e) {
        //     console.log(e.code);
        //     console.log(e.msg);
        // }

        //client.sub

        // client.video.trackFace({
        //     url: path,
        // }).then(function (response) {
        //     console.log('The age is: ' + response[0].attributes.age);
        //     console.log('The gender is: ' + response[0].attributes.gender);
        // },function (error) {
        //     console.log("Error"+JSON.stringify(error));
        // });

        client.face.detect({
            url:'http://localhost:3000/uploads/kamal.jpg'
        }).then(function (response) {
            console.log(JSON.stringify(response));
        },function (error) {
            console.log(JSON.stringify(error));
        });

        // client.face.verify([
        //     "http://localhost:3000/uploads/kamal.jpg",
        //     "http://localhost:3000/uploads/kamal1.jpg"
        // ]).then(function(response){
        //     console.log(JSON.stringify(response));
        // },function(error){
        //
        //     console.log(JSON.stringify(error));
        // });

    }
});

var upload = multer({ //multer settings
    storage: storage
}).array('file');

exports.uploadVideo = function (req,res) {

    upload(req,res,function () {

    });

};