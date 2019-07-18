const mongoose = require('mongoose')
const Schema = mongoose.Schema
// TODO: set required properly
const citySchema = new Schema({
    name: {type: String, required: true},
    updatedAt: {type: Date, required: true},
    temp: {type: Number, required: true},
    condition: {type: String, required: true},
    conditionPic: {type: String, required: true},
    isSaved: {type: Boolean, required: true}
})
const City = mongoose.model('City', citySchema)

module.exports = City