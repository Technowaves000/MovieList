const assert = require('assert');
const movieModel = require("../models/movieModel.js")
const userModel = require("../models/userModel.js")

const controller = {

  getLogin: function (req, res) {
    res.render('login');
  },

  postLogin: async function (req, res) {
    var email = req.body.email;
    var pwd = req.body.password;
    console.log(req.body)
    if (email == "shanikoi@gmail.com") {
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
    var email = req.body.email;
    var pwd = req.body.password;

    // add to db code here
    res.end()
  },

  getHome: function(req, res) {
    res.render('home',
    {
      film: [
        {
          filename: 'img1.jpg',
          id: 001
        },
        {
          filename: 'img2.jpg',
          id: 002
        },
        {
          filename: 'img3.jpg',
          id: 003
        },
        {
          filename: 'img4.jpg',
          id: 004
        },
      ]
    });
  },

  getFilm: function(req, res) {
    if(req.params.filmid == 001) {
      res.render('film', {filename:  'img1.jpg', title: 'American Psycho', year: 2000, description:'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.', rating: 4.3, filmid: req.params.filmid})
    }
    else if (req.params.filmid == 002) {
      res.render('film', {filename:  'img2.jpg', title: 'American Psycho', year: 2000, description:'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.', rating: 4.3, filmid: req.params.filmid})
    }
    else if (req.params.filmid == 003) {
      res.render('film', {filename:  'img3.jpg', title: 'American Psycho', year: 2000, description:'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.', rating: 4.3, filmid: req.params.filmid})
    }
    else if (req.params.filmid == 004) {
      res.render('film', {filename:  'img4.jpg', title: 'American Psycho', year: 2000, description:'A wealthy New York investment banking executive hides his alternate psychopathic ego from his co-workers and friends as he escalates deeper into his illogical, gratuitous fantasies.', rating: 4.3, filmid: req.params.filmid})
    }
    else {
      res.send('404 NOT FOUND')
    }
  },

  getReview: function (req, res) {
    filename = 'img' + req.params.filmid + '.jpg';
    console.log(filename)
    res.render('review', {filename: filename});
    console.log("this is getReview")
  },

  postReview: async function (req, res) {
    var rev = req.body.review_text;

    console.log(rev);
    console.log("this is postReview")
    res.render('home',
    {
      film: [
        {
          filename: 'img1.jpg',
          id: 001
        },
        {
          filename: 'img2.jpg',
          id: 002
        },
        {
          filename: 'img3.jpg',
          id: 003
        },
        {
          filename: 'img4.jpg',
          id: 004
        },
      ]
    });
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
      
      console.log(title);
      console.log(year);
      console.log(desc);
      res.render('home');
  }


}







module.exports = controller;
