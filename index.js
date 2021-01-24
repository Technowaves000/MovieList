const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes/routes.js');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));
app.use('/', routes);

app.listen(port, function () {
    console.log('Listening at port ' + port)
});
