const mongoose = require('mongoose');


const visitorSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    residentID: {
        type: String,
        required: true
    },
    residentName: {
        type: String,
        required: true
    },
    residentAddress: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('visitorHistory', visitorSchema)