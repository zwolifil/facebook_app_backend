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
};
