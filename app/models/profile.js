const mongoose = require('mongoose');

module.exports = mongoose.model('Profile', {
    avatar : {type : String, default: ''},
    description: {type: String, default: ''},
    name: {type: String, default: ''}
});