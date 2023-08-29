const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('admin', adminSchema);