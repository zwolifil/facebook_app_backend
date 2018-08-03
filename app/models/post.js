const mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    image : {type : String, default: ''},
    content: {type: String, default: ''},
    author: {type: String, default: ''},
    _idProfile: {type: String, default: ''}
});