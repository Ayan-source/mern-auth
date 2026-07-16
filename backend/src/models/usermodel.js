const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    Role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    },
    UpdatedAt: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('User', Userschema);