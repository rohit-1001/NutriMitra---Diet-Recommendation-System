const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    organiser: {
        type: String,
        required: true,
    },
    orgemail: {
        type: String,
        required: true,
    },
    speaker: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    meetId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Event', EventSchema);