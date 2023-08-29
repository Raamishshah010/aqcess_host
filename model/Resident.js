const mongoose = require('mongoose');


const residentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    address: {
        type: String,
        required: true,

    },
    pin: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },

});


module.exports = mongoose.model('resident', residentSchema);