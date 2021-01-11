const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Description: String,
    Rating: Number,
    Review: String
})

module.exports= mongoose.model('Movie', modelSchema)