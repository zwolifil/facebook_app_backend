const mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    title : {type : String, default: ''},
    content: {type: String, default: ''},
    author: {type: String, default: ''}
});