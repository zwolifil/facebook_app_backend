const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbuser = process.env.dbuser;
const dbpassword = process.env.dbpassword;
const databaseUrl = '@ds131800.mlab.com:31800/facebook-app';

module.exports = function(app){
    mongoose.connect(`mongodb://${dbuser}:${dbpassword}${databaseUrl}`);
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DEconstE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use(bodyParser.json());
};