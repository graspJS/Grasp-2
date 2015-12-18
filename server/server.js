var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require('./database/dbsetup.js');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var controller = require('./database/controllers.js');

app.use(express.static(__dirname + '/../app'));

// SOCKETS =======================================
io.sockets.on('connection', function(socket) {
  socket.on('addBlock', function(data) {
    socket.broadcast.emit('onBlockAdded', data);
  });
  socket.on('deleteBlock', function(data) {
    socket.broadcast.emit('onBlockDelete', data); 
  })
  // var lastPosition = null; 
  // socket.broadcast.emit('upDatePosition', lastPosition);
  socket.on('changePosition', function(data) {
    // lastPosition = data; 
    socket.broadcast.emit('updatePosition', data);
  }); 
  socket.on('addMessage', function(data) {
    socket.emit('onMessageAdded', data); 
  }); 
});

// API ============================================
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
      console.log("Back in controller", result === null)
      if(result === null) {
        response.sendStatus(409);
        throw new Error("Sign in failed");
      } else if(err) {
      console.log(err);
      response.send(err.detail).status(409);
    } else {
      console.log("in here")
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

http.listen(3000, function() {
  console.log('listening on 3000');
});

module.exports = app;
