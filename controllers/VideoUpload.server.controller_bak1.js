/**
 * Created by CSS on 19-10-2016.
 */


var multer = require('multer');

var ffmpeg = require('ffmpeg');

var unirest = require('unirest');

var Clarifai = require('clarifai');
var clarifiApp = new Clarifai.App(
    'IuljbE9o3Msk4rFnRsw2D_mL8oG4Ze7hL4rDcJcu',
    '49iF3VqchXZNLlmq8H-Mkz3o6HS7yHLmMc-hgNp3'
);

var fs = require('fs');

var oxford = require('project-oxford'),
    client = new oxford.Client('fccc1426d91b47498682f3aebe06fb50');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log("req.body" + req.body.file);
        cb(null, file.originalname);
        //
        var path = 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ4UdG4l12okA8mdHQL_PkUxBmTUQz5XlAOfeD0XKo7yKuZHb73';

        // clarifiApp.inputs.create('https://samples.clarifai.com/puppy.jpeg').then(
        //     searchForDog,
        //     function(err) {
        //         console.error(err);
        //     }
        // );

// search for concepts

        clarifiApp.inputs.create([{
            "url": "http://localhost:3000/uploads/kamal.jpg",
            "facedetect": [
                { "id": "kamal", "value": true },
                { "id" : "siva", 'value':false}
            ]
        },{
            "url": "http://localhost:3000/uploads/Sivakarthikeyan.jpg",
            "facedetect": [
                { "id": "siva", "value": true },
                { "id": "kamal", "value": false }
            ]
        }]).then(
            createModel,
            errorHandler
        );

        // clarifiApp._requestToken().then(function () {
        //     clarifiApp.models.create('Man').then(trainMan,function (err) {
        //         console.error(err);
        //     });
        // clarifiApp.models.predict(Clarifai.GENERAL_MODEL, path).then(
        //     function(response) {
        //         console.log(response);
        //     },
        //     function(err) {
        //         console.error(err);
        //     }
        // );
        // });



    }
});


// once inputs are created, create model by giving name and list of concepts
function createModel(inputs) {
    clarifiApp.models.create('Man', ["kamal","siva"]).then(
        trainModel,
        errorHandler
    );
}

// after model is created, you can now train the model
function trainModel(model) {
    model.train().then(function (response) {
        predictModel(response);
    },function (error) {
        errorHandler(error);
    });
}

// after training the model, you can now use it to predict on other inputs
function predictModel(model) {
    model.predict(['https://localhost:3000/uploads/kamal1.jpg']).then(
        function(response) {
            console.log(response);
        }, errorHandler
    );
}

function errorHandler(err) {
    console.error(err);
}

function trainMan(response){
    // response.predict(Clarifai.GENERAL_MODEL, 'http://localhost:3000/kamal.jpg').then(
    //     function(response) {
    //         console.log(response);
    //     },
    //     function(err) {
    //         console.error(err);
    //     }
    // );
    clarifiApp.train(response).then(function (response) {
        console.log(response);
    },function (error) {
        console.log(error);
    });
}

function searchForDog(response) {
    clarifiApp.inputs.search([{
        name: 'dog'
    }]).then(
        function(response) {
            console.log(response);
        },
        function(response) {
            console.error(response);
        }
    );
}

var upload = multer({ //multer settings
    storage: storage
}).any();

exports.compareLoadedInput = function (req,res) {

    unirest.post("https://face.p.mashape.com/faces/group?api_key=83c3a4c9d52b4493847b3aefe4485391&api_secret=385f895ef22a4b03ae7cb5f7bffbba21")
        .header("X-Mashape-Key", "yAxqGzcMlDmshrgmwEa9tOuxk4khp11aUKijsn8h0VRMsVWTfq")
        .field("attributes", "all")
        .field("detector", "Aggressive")
        .attach("files", fs.createReadStream("public/uploads/Sivakarthikeyan.jpg"),fs.createReadStream("public/uploads/kamal.jpg"))
        .field("namespace", "crispImg")
        .field("threshold", 30)
        .field("uids", "all")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
        });

};


exports.uploadVideo = function (req,res) {

    upload(req,res,function (err,response) {
        if(err) {
            res.send(500, {error: err});
        }
        res.send(response);
    });

};