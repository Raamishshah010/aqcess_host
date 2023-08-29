const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ["manager", "security-guard", "resident"],
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('user', userSchema)