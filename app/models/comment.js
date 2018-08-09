const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
    content: {type: String, default: ''},
    profile: {type: String, default: ''},
    idImage: {type: String, default: ''}
});