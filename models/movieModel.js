const mongoose = require("mongoose")
const Users = require("./userModel").schema
const Reviews = require("./reviewModel").schema

const modelSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Year: {type: Number, required: true},
    Description: {type: String, required: true},
    Rating: {type: Number, required: true, default: 0},
    numRaters: {type: Number, default: 0},
    Review: [Reviews],
    Picture: {type: String, required: true}
})

module.exports= mongoose.connection.model('Movie', modelSchema)
