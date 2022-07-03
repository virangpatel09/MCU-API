const mongoose = require('mongoose');

const DBschema = new mongoose.Schema({
    name: String,
    category: String,
    species: String,
    gender: String,
    status: String,
    movie: Array,
    tv_series: Array,
    image: String,
    description: String,
})

module.exports = mongoose.model('Schema',DBschema)