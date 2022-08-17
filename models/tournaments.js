const mongoose = require('mongoose')
const { Schema } = mongoose;

const tournament = new Schema({
    competition_name: String,
    competition_level: String
})

const tournaments = new Schema({
    tournament: [tournament],
    last_update: {type: Date, default: Date.now()},
    updated: {type: Boolean, default: true}
});

const Tournaments = mongoose.model('Tournaments', tournaments)

module.exports = { Tournaments }