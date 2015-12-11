var express = require('express');
var app = express();

var db = require('./database/dbsetup.js');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var controller = require('./database/controllers.js');
app.use(express.static(__dirname + '/../app'));

app.post('/api/signup', function (request, response) {
  controller.users.signup(request, function (err, result) {
    if(err) {
      response.send(err.detail).status(409);
    } else {
      response.sendStatus(201);
    }
  });
});

app.post('/api/signin', function (request, response) {
    controller.users.signin(request, function (err, result) {
    if(err) {
      console.log(err);
      response.send(err.detail).status(409);
    } else if (result.length === 0) {
      response.sendStatus(409);
      throw new Error("Sign in failed");
    } else {
      response.send(result).status(201);
      //render canvas
    }
  });
});

app.listen(3000, function () {"listening on 3000";});

module.exports = app;