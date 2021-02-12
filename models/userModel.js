const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Admin: {type: Boolean, default: false}
})

module.exports= mongoose.connection.model('User', userSchema)
