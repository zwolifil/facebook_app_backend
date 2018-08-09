const Profile = require('./../models/profile');
const Comment = require('../models/comment');

module.exports = function(app) {
    app.get('/profiles', function(req, res) {
        Profile.find({},function(err,posts){
            if(err) throw err;
            res.send(posts);
        });
    });

    app.post('/profiles',function(req, res) {
        Profile(req.body)
            .save(function (err, data) {
                if (err) throw err;
                res.json(data);
            });
    });

    app.put('/profiles/:id', function (req, res) {
            Profile
                .updateOne({_id: req.params["id"]}, {
                    $set: {
                        name: req.body['name'],
                        avatar: req.body['avatar'],
                        description: req.body['description'],
                        images: req.body['images']
                    }
                }, function (err) {
                    if (err) throw err;
                });
    });

    app.post('/profiles/:id/:idImage/comments', function (req, res) {
        Comment(req.body).save(function (err, data) {
            if(err) throw err;
            res.json(data);
        })
    });

    app.get('/profiles/:id/:idImage/comments', function(req, res) {
        Comment.find({post: req.params["id"], idImage: req.params["idImage"]},function(err,posts){
            if(err) throw err;
            res.send(posts);
        });
    });
};