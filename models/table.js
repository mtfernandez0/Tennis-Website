const mongoose = require('mongoose')
const { Schema } = mongoose;

const table = new Schema({
    name: String,
    value: {
        competitor_id: String,
        rank: Number,
        points: Number,
        pro_since: { type: Schema.Types.Mixed, default: "-"},
        height: { type: Schema.Types.Mixed, default: "-"},
        record: String,
        titles: Number
    }
});

const tables = new Schema({
    tableATP: [table],
    tableWTA: [table],
    last_update: {type: Date, default: Date.now()},
    updated: {type: Boolean, default: true}
});

const Tables = mongoose.model('Tables', tables)

module.exports = { Tables }
