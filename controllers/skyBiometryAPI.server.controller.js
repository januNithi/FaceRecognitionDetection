/**
 * Created by CSS on 26-10-2016.
 */

var unirest = require('unirest');

exports.detectImage = function (req,res) {

    unirest.post("https://face.p.mashape.com/faces/detect?api_key=83c3a4c9d52b4493847b3aefe4485391&api_secret=385f895ef22a4b03ae7cb5f7bffbba21")
        .header("X-Mashape-Key", "fMk9JOzOH6mshSoQeiEkFMu9Lhrip1p7UvMjsnRBcKVigPpkPi")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .send("attributes=all")
        .send("detector=Aggressive")
        .send("urls=https://pbs.twimg.com/profile_images/749607251736879105/hUeco1qw_400x400.jpg")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            res.send(result);
        },function (error) {
            res.send(500,{error:error});
        });

};

exports.faceRecognize = function (req,res) {

    unirest.post("https://face.p.mashape.com/faces/recognize?api_key=83c3a4c9d52b4493847b3aefe4485391&api_secret=385f895ef22a4b03ae7cb5f7bffbba21")
        .header("X-Mashape-Key", "fMk9JOzOH6mshSoQeiEkFMu9Lhrip1p7UvMjsnRBcKVigPpkPi")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .header("Accept", "application/json")
        .send("attributes=all")
        .send("detector=Aggressive")
        .send("limit=64")
        .send("namespace=crispImg")
        .send("uids=all")
        .send("urls=http://stylesatlife.com/wp-content/uploads/2014/02/Tamanna-On-Being-Natural.jpg," +
            "https://4.bp.blogspot.com/-lZ9O9W2hkLA/V39bfphD6MI/AAAAAAAADg0/OLsiEWV8-_gEJ2QxKIem_wRba57cSDy0QCLcB/s1600" +
            "/mini-tamanna+bhatia+hot+images+%288%29.jpg")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
            res.send(result);
        },function (error) {
            res.send(500,{error:error});
        });

};