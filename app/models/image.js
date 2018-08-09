const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

module.exports = mongoose.model('Image', {
    url: {type: String, default: ''},
    uid: {type: String, default: ''}
});