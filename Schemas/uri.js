// modules required
const mongoose = require('mongoose');

// URI schema
const uriSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        required: true
    },
    originalUri: {
        type: String,
        required: true
    },
    shortUri: {
        type: String,
        required: true
    }
})

// URI Model
const Uri = mongoose.model('URI', uriSchema);

// module export
module.exports = Uri;