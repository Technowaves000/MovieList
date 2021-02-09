const mongoose = require("mongoose")
const { db } = require("./userModel")
const modelSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Description: String,
    Rating: Number,
    Review: String,
    Picture: String
})

module.exports= mongoose.connection.model('Movie', modelSchema)
