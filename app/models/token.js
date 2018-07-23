const mongoose = require('mongoose');

module.exports = mongoose.model('Token', {
    token : {type : String, default: ''}
});