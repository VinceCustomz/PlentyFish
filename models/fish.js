const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
    },
    rateCatch: {
        type: Number,
        min: 1,
        max: 5
    }
})

const fishSchema = new Schema({
    dateCaught: {
        type: String,
    },
    fishSpecies: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    weight: {
        type: Number,
        required: true
    },
    lengthFish: {
        type: Number
    },
    taste: {
        type: String
    },
    comments: [commentSchema]

    }, {
    timestamps: true
});

module.exports = mongoose.model('Fish', fishSchema);