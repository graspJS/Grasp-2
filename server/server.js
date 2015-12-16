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
      response.status(409).send(err.detail);
    } else {
      console.log("result", result);
      response.status(201).send(result);
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
      response.status(201).send(result);
      //render canvas
    }
  });
});

app.get('/api/signedin', function (request, response) {
  controller.users.checkAuth(request, function (err, result) {
    if (err) {
      response.sendStatus(409);
      throw new Error("Sign in failed");
    } else {
      response.sendStatus(200);
    }
  })
})

app.listen(4000, function () {"listening on 3000";});

module.exports = app;
