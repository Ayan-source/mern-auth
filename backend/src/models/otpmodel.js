const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true
    },
    OTPHash: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Expiry: {
        type: Date,
        required: true
    },
    Used: {
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('OTP', OTPSchema);