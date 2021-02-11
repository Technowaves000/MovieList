const express = require('express');
const controller = require('../controllers/controller.js');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(session({
  secret: 'MovieListSecret',
  resave: true,
  saveUninitialized: true,
  cookieName: 'session'
  // cookie: {
  //   maxAge: 1000*60*24*30,
  //   httpOnly: true
  // }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', controller.getLogin);
app.get('/register', controller.getRegister);
app.get('/home', controller.getHome);
app.get('/film/:filmid', controller.getFilm);
app.get('/logout', controller.getLogOut);

app.post('/postLogin', controller.postLogin);
app.post('/postRegister', controller.postRegister);

app.get('/profile', controller.getProfile);

// reviews
app.get('/film/:filmid/add-review', controller.getReview);
app.post('/film/:filmid/postReview', controller.postReview);

// adding films
app.get('/addfilm', controller.addFilm);
app.post('/postaddfilm', controller.postaddFilm);













module.exports = app;
