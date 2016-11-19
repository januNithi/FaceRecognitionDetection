
/**
 * Created by CSS on 22-10-2016.
 */
var Kairos = require('kairos-api');
var client = new Kairos('612a699d', '6882a1a7f0fd783ebd7b61183b801c79');
var multer = require('multer');
var fs = require('fs');

var storageToDetect = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("req.body" + req.body.file);
        cb(null, file.originalname);
        //
        var path = 'public/uploads/'+file.originalname;
        req.session.facePath = path;

    }
});


var uploadToDetect = multer({ //multer settings
    storage: storageToDetect
}).single('files');

exports.detectImage = function (req,res) {

    var params = {
        image: 'https://pbs.twimg.com/profile_images/749607251736879105/hUeco1qw_400x400.jpg',
    };

    client.detect(params)
        .then(function(result) {
            console.log(result);
            res.send(result);
        })
        .catch(function(err) {
            console.log("error"+err);
            res.send(500,{error:err});
        });

};

exports.enrollImage = function (req,res) {

    uploadToDetect(req,res,function (err,response) {
        if(err) {
            res.send(500, {error: err});
        }
        var file = fs.readFileSync(req.session.facePath);
        var image = new Buffer(file).toString('base64');
        var params = {
            image: image,
            subject_id: 'test1',
            gallery_name: 'gallery1',
            selector: 'SETPOSE'
        };

        client.enroll(params)
            .then(function(result) {
                console.log(result);
                res.send(result);
            })
            .catch(function(err) {
                console.log("error"+err);
                res.send(500,{error:err});
            });
    });
};

exports.recognize = function (req,res) {

    var params = {
        "image":"http://1.bp.blogspot.com/-Hl6ZK-UNesE/UfPCaMpDhSI/AAAAAAAAEO4/QpUX_678LsI/s1600/Siva+Karthikeyan+Cute+Unseen+Stills+(2).jpg",
        "gallery_name":"gallery1"
    };
    client.recognize(params)
        .then(function (result) {
            console.log(JSON.stringify(result));
            res.send(result);
        }).catch(function (err) {
            console.log("error"+JSON.stringify(err));
        res.send(500,{error:err});
    })

};