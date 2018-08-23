const multer = require('multer');
const path = require('path');
const Image = require('../models/image');
const uuidv1 = require('uuid/v1');
const Comment = require('../models/comment');
const Post = require('./../models/post');
const Profile = require('./../models/profile');

module.exports = function(app) {
    const Storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "../Images");
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    });

    const upload = multer({
        storage: Storage
    }).array("imgUploader", 2);

    app.post("/images", function(req, res) {
        upload(req, res, async function(err) {
            if (err) {
                return res.send(err.message);
            }
            const uid = [];
            const postUid = uuidv1();
            const responseImages = [];
            await req.files.map((file, index) => {
                uid[index] = uuidv1();
                Image({url: file.originalname, uid: uid[index]}).save(function (err, data) {
                    if (err) throw err;
                    responseImages.push(data);
                    if(index === req.files.length - 1) {
                        res.json(responseImages);
                    }
                });
            });
            saveData(req, uid, postUid);
        });
    });

    app.get("/images/:id", function (req, res) {
        Image.find({uid: req.params['id']}, function (err, data) {
            if(err) throw err;
            res.sendFile(path.resolve("../Images/" + data[0].url))
        })
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

function saveData(req, uid, postUid) {
    const data = JSON.parse(req.body.body);

    //check what type of data
    if(req.body['dataType'] === 'Post') {
        Post({image: uid[0], content: data.content, author: data.author, _idProfile: data._idProfile})
            .save(function (err, data) {
                if (err) throw err;
            });
    } else if(req.body['dataType'] === 'Profile') {
        if(req.body['ifAvatar'] === 'true') {
            data.avatar = uid[0];
        }
        if(req.body['ifGalleryAdd'] === 'true') {
            uid[1] ?
                data.images.push({image: uid[1], ifPrivate: req.body['galleryPrivate']})
                :
                data.images.push({image: uid[0], ifPrivate: req.body['galleryPrivate']})
        }

        Profile
            .updateOne({_id: data._id}, {
                $set: data
            },function (err) {
                if (err) throw err;
            });
        if(req.body['nameChange'] === 'true') {
            JSON.parse(req.body['postsToChange']).map(post => {
                Post.updateOne({_id: post._id}, {
                    $set: post
                }, function (err) {
                    if(err) throw err;
                })
            })
        }
    } else if(req.body['dataType'] === 'ProfilePost') {
        data.avatar = uid[0];
        Profile(data)
            .save(function (err, data) {
                if(err) throw err;
            })
    }
}