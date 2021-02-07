const assert = require('assert');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")

const controller = {

  getLogin: function (req, res) {
    res.render('login');
  },

  postLogin: async function (req, res) {
    var username = req.body.username;
    var pwd = req.body.password;
    console.log(req.body);
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
    res.render('home',
    {
      film: [
        {
          url: 'https://images-na.ssl-images-amazon.com/images/I/41tlg4w9XdL._AC_.jpg',
          id: 001
        },
        {
          url: 'https://i.pinimg.com/originals/49/0f/8a/490f8a2f9e8aaf38db71aa8b906e1908.jpg',
          id: 002
        },
        {
          url: 'https://www.joblo.com/assets/images/joblo/posters/2020/03/76AA8E0F-AF7A-4FC2-A7DF-C194DBC85900.jpeg',
          id: 003
        },
        {
          url: 'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
          id: 004
        },
      ]
    });
  },

  getFilm: function(req, res) {
    if(req.params.filmid == 001) {
      res.render('film', {url:  'https://images-na.ssl-images-amazon.com/images/I/41tlg4w9XdL._AC_.jpg',
                          title: 'American Psycho',
                          year: 2000,
                          description:'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.',
                          rating: 3.9,
                          filmid: req.params.filmid})
    }
    else if (req.params.filmid == 002) {
      res.render('film', {url:  'https://i.pinimg.com/originals/49/0f/8a/490f8a2f9e8aaf38db71aa8b906e1908.jpg',
                          title: 'Whiplash',
                          year: 2014,
                          description:'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.',
                          rating: 4.3,
                          filmid: req.params.filmid})
    }
    else if (req.params.filmid == 003) {
      res.render('film', {url:  'https://www.joblo.com/assets/images/joblo/posters/2020/03/76AA8E0F-AF7A-4FC2-A7DF-C194DBC85900.jpeg',
                          title: 'Soul',
                          year: 2020,
                          description:'Joe Gardner is a middle school teacher with a love for jazz music. After a successful gig at the Half Note Club, he suddenly gets into an accident that separates his soul from his body and is transported to the You Seminar, a center in which souls develop and gain passions before being transported to a newborn child. Joe must enlist help from the other souls-in-training, like 22, a soul who has spent eons in the You Seminar, in order to get back to Earth.',
                          rating: 4.1,
                          filmid: req.params.filmid})
    }
    else if (req.params.filmid == 004) {
      res.render('film', {url:  'https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
                          title: 'Fight Club',
                          year: 1999,
                          description:'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground “fight clubs” forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
                          rating: 4.3,
                          filmid: req.params.filmid})
    }
    else {
      res.send('404 NOT FOUND')
    }
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
      var title = req.body.add_title;
      var year = req.body.add_year;
      var desc = req.body.add_desc;

      //display picture
    //   function readURL(input) {
    //     console.log("this is readURL")
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();

    //         reader.onload = function (e) {
    //             $('#tempPoster')
    //                 .attr('src', e.target.result)
    //                 .width(150)
    //                 .height(200);
    //         };

    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }

      console.log(req.body);
      res.redirect('/home');
  }


}







module.exports = controller;
