const mongoose = require("mongoose")
const url = `mongodb+srv://admin:Movie123@movielist.4gu9d.mongodb.net/MovieList?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => { console.log('working movie'); },
        err => { console.log(err);
});

const modelSchema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Description: String,
    Rating: Number,
    Review: String
})

module.exports= mongoose.connection.model('Movie', modelSchema)