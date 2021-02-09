const assert = require('assert');
const db = require('../models/db.js');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")
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
      userModel.findOne({ username }, (err, data) => {
        if (err) throw err;
        if (!data) {
          return done(null, false, {message: "Fill all the fields (flash)"});
        }
        bcrypt.compare(password, data.password, (err, match) => {
          if (err) throw err;
          if (!match) {
            return done(null, false, {message: "email or password didn't match"});
          }
          if (match) {
            return done(null, data);
          }
        });
      });
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
    if(req.params.filmid == 001) {
      res.render('review', {url:  'https://images-na.ssl-images-amazon.com/images/I/41tlg4w9XdL._AC_.jpg'})
    }
    else if (req.params.filmid == 002) {
      res.render('review', {url:  'https://i.pinimg.com/originals/49/0f/8a/490f8a2f9e8aaf38db71aa8b906e1908.jpg'})
    }
    else if (req.params.filmid == 003) {
      res.render('review', {url:  'https://www.joblo.com/assets/images/joblo/posters/2020/03/76AA8E0F-AF7A-4FC2-A7DF-C194DBC85900.jpeg'})
    }
    else if (req.params.filmid == 004) {
      res.render('review', {url:  'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'})
    }
    else {
      res.send('404 NOT FOUND')
    }
  },

  postReview: async function (req, res) {
    var rev = req.body.review_text;
    var rate = req.body.rate;

    console.log(req.body);
    res.redirect('/home');
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
