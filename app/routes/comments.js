const Comment = require('../models/comment');

module.exports = function(app) {
    app.get('/comments', function(req, res) {
        Comment.find({},function(err,data){
            if(err) throw err;
            res.send(data);
        });
    });

    app.delete('/comments/:id', function(req, res) {
        Comment.remove({_id: req.params['id']},function(err,data){
            if(err) throw err;
            res.send(data);
        });
    });
};