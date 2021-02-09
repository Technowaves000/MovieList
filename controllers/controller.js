const assert = require('assert');
const db = require('../models/db.js');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")

const controller = {

  getLogin: function (req, res) {
    res.render('login');
  },

  postLogin: async function (req, res) {
    var username = req.body.username;
    var pwd = req.body.password;
    if (username == "shanikoy") {
      if(pwd == "helloworld") {
        // req.session.loggedin = true;
        // req.session.username = username;
        res.redirect('/home');
      }
      else {
        res.send('Wrong password');
      }
    }
    else {
      res.send('Incorrect Username and/or Password!');
    }
    res.end();
  },

  getRegister: function (req, res) {
    res.render('register');
  },

  postRegister: async function(req, res){
    var username = req.body.username;
    var pwd = req.body.password;

    // add to db code here
    res.end()
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
