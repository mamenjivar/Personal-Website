var mongoose = require('mongoose');

// MONGOOSE SCHEMA - DATABASE FORMAT
var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Blog', blogSchema);