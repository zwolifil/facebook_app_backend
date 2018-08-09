const Post = require('./../models/post');
const Comment = require('../models/comment');

module.exports = function(app) {
    app.get('/posts', function(req, res) {
        Post.find({},function(err,posts){
            if(err) throw err;
            res.send(posts);
        });
    });

    app.post('/posts',function(req, res) {
        Post(req.body)
            .save(function (err, data) {
                if (err) throw err;
                res.json(data);
            });
    });

    app.put('/posts/:id', function (req, res) {
        Post
            .updateOne({_id: req.params["id"]}, {
                $set: {author: req.body['name']}
            }, function (err) {
                if(err) throw err;
            });
    });

    app.post('/posts/:id/:idImage/comments', function (req, res) {
        Comment(req.body).save(function (err, data) {
            if(err) throw err;
            res.json(data);
        })
    });

    app.get('/posts/:id/:idImage/comments', function(req, res) {
        Comment.find({post: req.params["id"], idImage: req.params["idImage"]},function(err,posts){
            if(err) throw err;
            res.send(posts);
        });
    });
};
