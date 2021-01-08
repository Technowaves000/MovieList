const express = require('express');
const controller = require('../controllers/controller.js');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', controller.getLogin);
app.get('/register', controller.getRegister);
app.get('/home', controller.getHome);
app.get('/film/:filmid', controller.getFilm);
app.post('/postLogin', controller.postLogin);
app.post('/postRegister', controller.postRegister);
app.get('/film/:filmid/add-review', controller.getReview);
app.post('/film/:filmid/postReview', controller.postReview);
module.exports = app;
