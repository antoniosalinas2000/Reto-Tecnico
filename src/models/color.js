const mongoose = require("mongoose");

const colorSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    pantone_value: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Color', colorSchema);