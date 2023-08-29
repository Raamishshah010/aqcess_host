const mongoose = require('mongoose');


const visitorSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true
    },
    residentID: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('visitor', visitorSchema)