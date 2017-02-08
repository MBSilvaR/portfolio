const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const session = require('express-session');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const methodoverride = require('method-override');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodoverride('_method'));

app.use(session({
  secret: 'testtesttest',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))


app.listen(port)
console.log("Server started on " + port);

app.get("/", function(req, res) {
  res.render('index')
});
