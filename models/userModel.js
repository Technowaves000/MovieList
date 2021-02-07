const mongoose = require("mongoose")
const url = `mongodb+srv://admin:Movie123@movielist.4gu9d.mongodb.net/MovieList?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => { console.log('working user'); },
        err => { console.log(err);
});

const userSchema = new mongoose.Schema({
    Username: String,
    Password: String
})

module.exports= mongoose.connection.model('users', userSchema)
