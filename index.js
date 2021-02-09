const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const db = require('./models/db.js');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));
app.use('/', routes);

db.connect();

app.listen(port, function () {
    console.log('Listening at port ' + port)
});
