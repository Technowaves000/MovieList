const mongoose = require("mongoose")
const Users = require("./userModel").schema

const reviewSchema = new mongoose.Schema({
    Author: {type: String, required: true},
    Body: {type: String, required: true}
})

module.exports= mongoose.connection.model('Review', reviewSchema)
