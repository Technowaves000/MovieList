const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true}
})

module.exports= mongoose.connection.model('User', userSchema)
