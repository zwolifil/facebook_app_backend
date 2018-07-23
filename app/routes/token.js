const {authenticate} = require('../auth/authentication.js');
const Token = require('../models/token.js');

module.exports = function (app) {
    app.get('/token', function(req, res) {
        Token.find({},function(err,token){
            if(err) throw err;
            res.send(authenticate(token[0].token));
        });
    });

    app.post('/token',function(req, res) {
        Token(req.body)
            .save(function (err, data) {
                if (err) throw err;
                res.json(data);
            });
    });
};