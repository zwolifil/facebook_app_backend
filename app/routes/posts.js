const Post = require('./../models/post');

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
};
