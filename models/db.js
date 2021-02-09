const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);

//connect to database
const url = "mongodb+srv://admin:Movie123@movielist.4gu9d.mongodb.net/MovieList";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error)
                throw error;
            else
                console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        console.log('hello')
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(result);
        });
    },

    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) return false;
            //console.log('Added ' + result);
            return true;
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },


    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, function(error, result) {
            // if(error) return callback(false);
            //console.log('Document modified: ' + result.nModified);
            // return callback(true);
        });
    },

    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, function(error, result) {

        });
    },

    deleteOne: function(model, conditions) {
        model.deleteOne(conditions, function (error, result) {
           // if(error) return callback(false);
            //console.log('Document deleted: ' + result.deletedCount);
           // return callback(true);
        });
    },

    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return result
            //console.log('Document deleted: ' + result.deletedCount);
            return result
        });
    }
};

module.exports = database;
