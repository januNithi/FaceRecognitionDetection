/**
 * Created by CSS on 26-10-2016.
 */
var Clarifai = require('clarifai');
var clarifiApp = new Clarifai.App(
    'IuljbE9o3Msk4rFnRsw2D_mL8oG4Ze7hL4rDcJcu',
    '49iF3VqchXZNLlmq8H-Mkz3o6HS7yHLmMc-hgNp3'
);

exports.detectImage = function (req,res) {

    clarifiApp.models.predict(Clarifai.GENERAL_MODEL, "https://top10cinema.com/dataimages/36814/36814-002.jpg").then(
        function(response) {
            // do something with response
            console.log(response);
            res.send(response.data);
        },
        function(err) {
            // there was an error
            console.log(err);
            res.send(500,{error:err});
        }
    );

};

exports.recognizeImages = function (req,res) {

    clarifiApp.inputs.create({
        url: "http://stylesatlife.com/wp-content/uploads/2014/02/Tamanna-On-Being-Natural.jpg",
        concepts: [
            {
                id: "test4",
                value: true
            }
        ]
    }).then(function (response) {

        clarifiApp.models.create(
            "category4",
            [
                { "id": "test4" }
            ]
        ).then(
            function(response) {
                // do something with response
                clarifiApp.models.train(response.id).then(
                    function(response) {
                        // do something with response
                        clarifiApp.models.predict(response.id, ["https://4.bp.blogspot.com/-lZ9O9W2hkLA/V39bfphD6MI" +
                        "/AAAAAAAADg0/OLsiEWV8-_gEJ2QxKIem_wRba57cSDy0QCLcB/s1600/mini-tamanna+bhatia+hot+images+%288%29.jpg"]).then(
                            function(response) {
                                // do something with response
                                console.log(response);
                                res.send(response.data);
                            },
                            function(err) {
                                // there was an error
                                console.log(err);
                                res.send(500,{error:err});
                            }
                        );

                    },
                    function(err) {
                        // there was an error
                        console.log(err);
                        res.send(500,{error:err});
                    }
                );
            },
            function(err) {
                // there was an error
                console.log(err);
                res.send(500,{error:err});
            }
        );


    }).catch(function (err) {
        console.log(err);
        res.send(500,{error:err});
    });

};