// modules required
const mongoose = require('mongoose');

// user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// user modle
const User = mongoose.model('User', userSchema);

// module export
module.exports = User;