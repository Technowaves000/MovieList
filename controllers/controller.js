const assert = require('assert');
const db = require('../models/db.js');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")
const reviewModel = require("../models/reviewModel.js")
const {isAuthenticated, isNotAuthenticated } = require('../config/auth');
const bcrypt = require("bcryptjs");

const controller = {

  getLogin: function (req, res) {
    // If there is already a session, user should be redirected to home
    var username = req.session.username;
    if(req.session.username){
        res.redirect('/home')
    } else {
        res.render('login');
    }
  },

  postLogin: async function (req, res) {
    let err;
    let {username, password, admin_bool} = req.body;

    if(!username || !password){
        err = "Please Fill All The Required Fields";
        res.render("login", { err });
    }

    if(err == null){
          // success = "You have successfully logged in!"
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
                console.log("req.session:" + req.session)
                res.redirect('/home');
                // res.redirect('home');
              }
            });
          });
      }

      console.log(username + "= username")
      console.log(password + "= password")
    // })
  },

  getRegister: function (req, res) {
    // If there is already a session, and user goes to register, session gets destroyed
    var username = req.session.username;
    if(req.session.username){

      // destroy session
      req.session.destroy(function(err) {
          if (err) throw err;
          res.redirect('/');
      })

    } else {
        res.render('register');
    }
  },

  postRegister: async function(req, res){
    let err;
    let {username, password, admin_bool} = req.body;
    console.log("1st check admin_bool: " + req.body.admin_bool)
    console.log("1st check username: " + req.body.username)

    // If user does not fill the fields
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

              if(admin_bool === undefined){
                admin_bool = false;
              } else {
                admin_bool = true;
              }

              console.log("2nd check admin_bool:"+admin_bool)

              var user = {
                Username: username,
                Password: password,
                Admin: admin_bool
              }

              console.log("3rd check admin_bool:"+user.Admin)

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
    var username = req.session.username;

    // If there is no session, user cannot go to localhost:3000/home
    if(!req.session.username){
        res.redirect('/')
    } else {
        console.log(req.session.username)
        db.findMany(movieModel,{}, {}, function(result){

          // check if user is admin
          userModel.findOne({ Username: username }, 'Admin', function (err, user) {
            if (err) throw err;
            var admin_bool = user.Admin;
            console.log("HOMEADMINCHECK:"+admin_bool);
            res.render('home',{film:result,
                              username:username, Admin:admin_bool});

          });

        })
    }

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

    // If there is no session, user cannot go to localhost:3000/film/filmid
    if(!req.session.username){
        res.redirect('/')
    } else {
        db.findOne(movieModel, {_id: req.params.filmid}, {}, function(result1){
          db.findMany(reviewModel, {}, {}, function(result2){

            // --- CHECK IF USER IS ADMIN --- //
            userModel.findOne({ Username: username }, 'Admin', function (err, user) {
              if (err) throw err;
              var admin_bool = user.Admin;
              console.log("GETFILMADMINCHECK:"+admin_bool);
              res.render('film', {film:result1, username:username, Admin:admin_bool});
            });
            // --- CHECK IF USER IS ADMIN --- //

          })
        })
    }
  },

  getReview: function (req, res) {
    // loads the Review form
    var id = req.params.filmid;

    var username = req.session.username;

    // If there is no session, user cannot go to localhost:3000/review
    if(!req.session.username){
        res.redirect('/')
    } else {
        // searches the database for the movie so that it can load the poster of the movie while creating a review
        db.findOne(movieModel, { _id: id }, {}, function(result){

          // --- CHECK IF USER IS ADMIN --- //
          userModel.findOne({ Username: username }, 'Admin', function (err, user) {
            if (err) throw err;
            var admin_bool = user.Admin;
            console.log("GETREVIEWADMINCHECK:"+admin_bool);
            res.render('review', {review:result, username:username, Admin:admin_bool});
          });
          // --- CHECK IF USER IS ADMIN --- //
        })
    }
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

    // If there is no session, user cannot go to localhost:3000/profile
    if(!req.session.username){
        res.redirect('/')
    } else {
        // --- CHECK IF USER IS ADMIN --- //
        userModel.findOne({ Username: username }, 'Admin', function (err, user) {
          if (err) throw err;
          var admin_bool = user.Admin;
          console.log("GETPROFILEADMINCHECK:"+admin_bool);
          res.render('profile', {username:username, Admin:admin_bool});
        });
        // --- CHECK IF USER IS ADMIN --- //
    }
  },

  addFilm: async function (req, res) {
      var username = req.session.username;
      var admin_boolean = req.session.admin_boolean;

      // If there is no session, user cannot go to add film
      if(!req.session.username){
          res.redirect('/')
      } else {
        // --- CHECK IF USER IS ADMIN --- //
        userModel.findOne({ Username: username }, 'Admin', function (err, user) {
          if (err) throw err;
          var admin_bool = user.Admin;
          console.log("ADDFILMADMINCHECK:"+admin_bool);
          res.render('addfilm', {username:username, Admin:admin_bool});
        });
      }
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
