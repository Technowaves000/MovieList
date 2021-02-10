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
    // var username = req.body.username;
    // var pwd = req.body.password;
    // if (username == "shanikoy") {
    //   if(pwd == "helloworld") {
    //     // req.session.loggedin = true;
    //     // req.session.username = username;
    //     res.redirect('/home');
    //   }
    //   else {
    //     res.send('Wrong password');
    //   }
    // }
    // else {
    //   res.send('Incorrect Username and/or Password!');
    // }
    // res.end();
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
            // req.session.username = username;
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
    db.findMany(movieModel,{}, {}, function(result){
      res.render('home',{film:result});
    })
  },

  getFilm: function(req, res) {

    db.findOne(movieModel, {_id: req.params.filmid}, {}, function(result){
        res.render('film', {film:result});
    })
  },

  getReview: function (req, res) {
    // loads the Review form
    var id = req.params.filmid;

    // searches the database for the movie so that it can load the poster of the movie while creating a review
    db.findOne(movieModel, { _id: id }, {}, function(result){
        res.render('review', {review:result});
    })
  },

  postReview: async function (req, res) {
    var rate = req.body.rate;

    var review = {
      Author: "temp_username",
      Body: req.body.review_text
    }

    // TO DO:
    // post review and ratings on DB

    newReview = new reviewModel({review})
    console.log("Created a new Review");

    movieModel.updateOne({_id: req.params.filmid},
                        {$push: {Review: review} },
                        function(err, movie ){
                          if(err) throw err;
                          console.log("Review added")
                        })


    // Compute for Rating
    // use $set instead of $push

    console.log(req.body);
    res.redirect('/film/' + req.params.filmid);
  },

  getProfile: function (req, res) {
    res.render('profile');
  },

  addFilm: async function (req, res) {
      res.render('addfilm');
  },

  postaddFilm: async function (req, res) {
      var movie = {
          Title: req.body.add_title,
          Year: req.body.add_year,
          Description: req.body.add_desc,
          Picture: req.body.add_url
      }

      db.insertOne(movieModel, movie, function(flag){});

      res.redirect('/home');
  }

}







module.exports = controller;
