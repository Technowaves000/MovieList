const db = require('./models/db.js');
const movieModel = require("./models/movieModel.js")
const userModel = require("./models/userModel.js")

db.connect();

var user = {
    Username: 'User',
    Password: 'Password'
}

db.insertOne(userModel, user, function(flag){});

var movie = {
    Title: 'Sample',
    Year: 2020,
    Description: "nice movie",
    Rating: 10,
    Review: "good movie"
}

db.insertOne(movieModel, movie, function(flag){});
// var participationDummy = {
//     email: 'test@yahoo.com',
//     listingId: 'test',
//     bid: 1000,
//     status: 'active'
// }

// db.insertOne(Participation, participationDummy, function(flag){});

// var pinnedDummy = {
//     email: 'test',
//     listingId: 'test',
//     pinStatus: 'active'
// }

// db.insertOne(Pinned, pinnedDummy, function(flag){});

// var ratingdummy = {
//     rater: 'test',
//     rated: 'test',
//     rating: 10,
//     comment: 'good'
// }

// db.insertOne(Rating, ratingdummy, function(flag){});

// var userDummy = {
//     profilePic: 'https://coconuts.co/wp-content/uploads/2019/03/archer_4212_032118-960x540.jpg',
//     email: 'test2',
//     phonenum: '09209171889',
//     firstname: 'Test',
//     lastname: 'Test',
//     username: 'Test',
//     password: 'test',
//     birthday: new Date(1990, 12, 15),
//     rating: 10,
//     address: 'test address',
//     city: 'Manila',
//     description: 'test'
// }

// db.insertOne(User, userDummy, function(flag){
//     console.log("added: " + flag);
// });
