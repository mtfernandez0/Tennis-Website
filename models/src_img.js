const mongoose = require('mongoose')
const { Schema } = mongoose;

const imgsSchema = new Schema({
    player: { type: Map, of: String }
});

module.exports = mongoose.model('ImgUrls', imgsSchema)