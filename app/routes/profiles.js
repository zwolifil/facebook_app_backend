const Profile = require('./../models/profile');

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
};