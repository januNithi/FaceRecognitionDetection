/**
 * Created by CSS on 03-12-2016.
 */
var Faced = require('faced');
var faced = new Faced();

exports.detectFace = function (req,res) {
    faced.detect('public/uploads/kamal.jpg', function (faces, image, file) {
        if (!faces) {
            return console.log("No faces found!");
        }

        var face = faces[0];

        console.log(
            "Found a face at %d,%d with dimensions %dx%d",
            face.getX(),
            face.getY(),
            face.getWidth(),
            face.getHeight()
        );

        console.log(
            "What a pretty face, it %s a mouth, it %s a nose, it % a left eye and it %s a right eye!",
            face.getMouth() ? "has" : "does not have",
            face.getNose() ? "has" : "does not have",
            face.getEyeLeft() ? "has" : "does not have",
            face.getEyeRight() ? "has" : "does not have"
        );
    });
};
