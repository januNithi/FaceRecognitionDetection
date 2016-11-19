/**
 * Created by CSS on 26-10-2016.
 */

var cloudsight = require ('cloudsight') ({
    apikey: 'u3jK7T7MhbvcdLKlf_itGw'
});

exports.detectImage = function (req,res) {

    var image = {
        image: 'public/uploads/dfsfsf.jpg',
        locale: 'en-US'
    };

    cloudsight.request (image, true,  function (err, data) {
        if (err) {
            console.log (err);
            res.send(500,{error:err});
        }

        // console.log (data);
        // res.send(data);
        cloudsight.response(data.token,function (err1,data1) {
            if (err1) {
                console.log (err1);
                res.send(500,{error:err1});
            }

            console.log (data1);
            res.send(data1);
        });
    });

};