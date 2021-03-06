var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('./handlers/error');
const cors = require('cors');
const config = require('config');

var targets = require('./routes/targets');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/targets', targets);

if (app.get('env') === 'production') {
  var distDir = __dirname + '/dist/angular-targets-frontend/';
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir));
  });
}

// took out last error handling middle ware to make sure refreshing works in angular app
app.use(function(req, res, next) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir));
  });
});

module.exports = app;
