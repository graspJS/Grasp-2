var persist = require('./server'); 

module.exports = function(socket) {
  // CANVAS ===================================================== 
  socket.on('canvasChange', function(data) {
    socket.broadcast.to(socket.rooms[socket.id]).emit('onCanvasChange', data);
  }); 
  socket.on('changePosition', function(data) {
    socket.broadcast.to(socket.rooms[socket.id]).emit('updatePosition', data);
  }); 

  // PRIVATE SESSIONS ===================================================================
  // Student
  socket.on('addStudent', function(user) {
    if (user !== null) {
      // Teacher available
      if (persist.teachers.length > 0) {
        // Splice teacher off teacher queue, then student joins teacher's room 
        var availableTeacher = persist.teachers.splice(0, 1).toString(); 
        socket.join(socket.rooms[availableTeacher]); 
        // Inform teacher of incoming student 
        socket.broadcast.to(socket.rooms[availableTeacher]).emit('onMessageAdded', user + " has joined the room as a student!"); 
      } else {
        // No teachers available, push student into student queue 
        persist.students.push(user);
        // Create empty room for student 
        socket.rooms[user] = user; 
        socket.join(user); 
        socket.emit('onMessageAdded', "You have connected to room: " + user);
      }
      // socket.emit('onMessageAdded', "You have connected to room: " + socket.rooms[user]);  
    } else {
      console.log("username was null");
      return; 
    }
  });

  // Teacher
  socket.on('addTeacher', function(user) {
    if (user !== null) {
      // Student available
      if (persist.students.length > 0) {
        // Splice student off student queue, then teacher joins students's room 
        var availableStudent = persist.students.splice(0, 1).toString(); 
        socket.rooms[availableStudent] = availableStudent; 
        socket.join(availableStudent); 
        // Inform student of incoming teacher 
        socket.broadcast.to(socket.rooms[availableStudent]).emit('onMessageAdded', user + " has joined the room as a teacher!"); 
      } else {
        // No student available, push teacher into teacher queue 
        persist.teachers.push(user);
        // Create empty room for teacher 
        socket.rooms[user] = socket.id; 
        socket.join(socket.rooms[user]); 
        socket.emit('onMessageAdded', "You have connected to room: " + socket.rooms[user]);
      }
      // socket.join(socket.rooms[socket.id]);
      // socket.emit('onMessageAdded', "You have connected to room: " + socket.rooms[socket.id]);  
    } else {
      console.log("username was null");
      return; 
    }
  });
  socket.on('join', function(name) {
    console.log(name);

  }); 
  // Disconnect from private session
  // socket.on('disconnect', function() {
  //   console.log("wtf")
  //   console.log(socket.room)
  //   socket.emit('onMessageAdded', "You have left room: " + socket.room);  
  //   socket.leave(socket.room); 
  //   delete socket.room; 
  // }); 

  socket.on('addMessage', function(data) {
    for (var key in socket.rooms) {
      console.log(key)
      socket.broadcast.to(socket.rooms[key]).emit('onMessageAdded', data); 
    }
  }); 
}; 
