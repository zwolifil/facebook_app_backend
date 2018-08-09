const multer = require('multer');
const Image = require('../models/image');
const uuidv1 = require('uuid/v1');
const Comment = require('../models/comment');

module.exports = function(app) {
    const Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "../facebook-like-app/public/Images");
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    });

    const upload = multer({
        storage: Storage
    }).single("imgUploader");

    app.post("/images", function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.send(err.message);
            }
            Image({url: "/Images/" + req.file.originalname, uid: uuidv1()}).save(function (err, data) {
                if(err) throw err;
                res.json(data);
            });
        });
    });

    app.get('/images', function(req, res) {
        Image.find({},function(err,posts){
            if(err) throw err;
            res.send(posts);
        });
    });

    app.post('/images/:id/comments',  function (req, res) {
        Comment(req.body)
            .save(function (err, data) {
                if(err) throw err;
                return res.json(data);
            })
    });

};