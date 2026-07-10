const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Auth', AuthSchema);    