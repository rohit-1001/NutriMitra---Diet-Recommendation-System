const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ind: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;