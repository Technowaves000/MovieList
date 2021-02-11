const assert = require('assert');
const db = require('../models/db.js');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")
const reviewModel = require("../models/reviewModel.js")
const {isAuthenticated, isNotAuthenticated } = require('../config/auth');
const bcrypt = require("bcryptjs");

const controller = {

  getLogin: function (req, res) {
    res.render('login');
  },

  postLogin: async function (req, res) {

    let {username, password} = req.body;

    // new logging({ Username: "username" }, (username, password, done) => {
    //   console.log("inside logging")
      userModel.findOne({ Username: username }, (err, data) => {
        console.log("entered findone")
        console.log(data + " = this is data")
        if (err) throw err;
        console.log("before data")
        if (!data) {
          // return done(null, false, {message: "Fill all the fields (flash)"});
          console.log("err 1")
        }
        console.log("before bcrypt")
        bcrypt.compare(password, data.Password, (err, match) => {
          // if (err) throw err;
          console.log(password)
          console.log(data.Password)
          if (!match) {
            // return done(null, false, {message: "email or password didn't match"});
            console.log("err 2")
            res.send('Incorrect Username and/or Password!');
          }
          if (match) {
            // var username = req.body.username;
            // return done(null, data);
            console.log(username)
             // req.session.loggedin = true;
            req.session.username = req.body.username
            console.log("session:" + req.session.username)
            res.redirect('/home');
            // res.redirect('home');
          }
        });
      });


      console.log(username + "= username")
      console.log(password + "= password")
    // })
  },

  getRegister: function (req, res) {
    res.render('register');
  },

  postRegister: async function(req, res){
    // var username = req.body.username;
    // var pwd = req.body.password;
    let err;
    let {username, password} = req.body;
    // add to db code here


    // db.insertOne(userModel, user, function(flag){});

    if (!username || !password) {
      err = "Please Fill All The Fields...";
      res.render("register", { err });
    }

    if (err == null) {
      console.log("it has entered")
      userModel.findOne({ Username: username }, function (err, data) {
        if (err) throw err;
        if (data) {
          console.log("User Exists");
          err = "User Already Exists With This Email...";
          res.render("register", { err });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              password = hash;
              var user = {
                Username: username,
                Password: password
              }
              db.insertOne(userModel, user, function(flag){});
              res.redirect('/')
            });
          });
        }
      });
    }
    console.log(username + "= username")
    console.log(password + "= password")

  },

  getHome: function(req, res) {
    // var {username} = req.session.username
    var username = req.session.username;
    console.log(req.session.username)
    db.findMany(movieModel,{}, {}, function(result){
      res.render('home',{film:result, username:username});
    })
  },

  getFilm: function(req, res) {
    var film_details = {
      Title: req.params.Title,
      Description: req.params.Description,
      Year: req.params.Year,
      Rating: req.params.Rating,
      Picture: req.params.Picture,
      Review: [],
    }

    var username = req.session.username;
    console.log(req.session.username + "this is the session")

    db.findOne(movieModel, {_id: req.params.filmid}, {}, function(result1){
      db.findMany(reviewModel, {}, {}, function(result2){
        console.log(result1)
        console.log(username)
        res.render('film', {film:result1, username:username});
      })
    })
  },

  getReview: function (req, res) {
    // loads the Review form
    var id = req.params.filmid;

    var username = req.session.username;

    // searches the database for the movie so that it can load the poster of the movie while creating a review
    db.findOne(movieModel, { _id: id }, {}, function(result){
        res.render('review', {review:result, username:username});
    })
  },

  postReview: async function (req, res) {
      var rate = parseInt(req.body.rate);
      console.log("rate:"+rate)
      var review = {
        Author: req.session.username,
        Body: req.body.review_text
      }

      newReview = new reviewModel({review})
      console.log("Created a new review")

      movieModel.updateOne({_id:req.params.filmid}, {$push: {Review: review}},
        function(err, movie){ if(err) throw err; console.log("Review added on DB")})

      movieModel.findOne({_id:req.params.filmid}, 'Rating numRaters',
        function(err, movie){
          if(err)
            return handleError(err)

          var raters = parseInt(movie.numRaters)
          var oldRaters = parseInt(movie.numRaters)
          console.log("numRaters: " + raters)
          raters++
          console.log("numRaters + 1: " + raters)

          var rating = parseFloat(movie.Rating);
          console.log("movie.Rating: " + rating)
          var accumulatedRating = rating
          console.log("Rating + req.body.rate: " + accumulatedRating)
          console.log("numRaters: " + raters)
          var newRating = (((accumulatedRating * oldRaters) + rate)/ raters).toFixed(2)
          console.log("accumulatedRating / raters: " + newRating)
          console.log("numRaters: " + raters)

          if(newRating > 5){
            newRating = 5
            console.log(newRating)
          }  else if(newRating < 0) {
            newRating = 0
            console.log(newRating)
          }

          movieModel.updateOne({_id: req.params.filmid},
            {$set: {Rating: newRating, numRaters: raters}},
              function(err, movie){if(err) throw err; })

        })

      console.log(req.body)
      res.redirect('/film/' + req.params.filmid)
  },

  getProfile: function (req, res) {
    var username = req.session.username;
    res.render('profile', {username:username});
  },

  addFilm: async function (req, res) {
      var username = req.session.username;
      res.render('addfilm', {username:username});
  },

  postaddFilm: async function (req, res) {
      var movie = {
          Title:        req.body.add_title,
          Year:         req.body.add_year,
          Description:  req.body.add_desc,
          Rating:       '0',
          numRaters:    '0',
          Picture: req.body.add_url
      }

      db.insertOne(movieModel, movie, function(flag){});



      console.log(req.body)
      res.redirect('/home');
  },

  getLogOut: function (req, res) {

      req.session.destroy(function(err) {
          if (err) throw err;

          res.redirect('/');
      })

  }

}







module.exports = controller;
