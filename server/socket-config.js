var persist = require('./server'); 

module.exports = function(socket) {
  // CANVAS ===================================================== 
  socket.on('canvasChange', function(data) {
    socket.broadcast.to(socket.rooms[1]).emit('onCanvasChange', data);
  }); 
  socket.on('changePosition', function(data) {
    socket.broadcast.to(socket.rooms[1]).emit('updatePosition', data);
  }); 

  // CHAT ============================================================================
  // On socket connection/disconnection 
  socket.on('join', function(name) {
    socket.emit('onMessageAdded', "Welcome to GraspJS! Feel free to play around, or join a teacher/student queue!"); 
  }); 
  socket.on('disconnect', function() {
    socket.emit('leave'); 
  })
  // Chat
  socket.on('addMessage', function(data) {
    socket.broadcast.to(socket.rooms[1]).emit('onMessageAdded', data);
  }); 
  // Disconnect from private session
  socket.on('leave', function() {
    socket.emit('onMessageAdded', "You have left room: " + socket.rooms[1]);
    socket.broadcast.to(socket.rooms[1]).emit('onMessageAdded', "Session has ended.");
    socket.broadcast.to(socket.rooms[1]).emit('leftUser'); 
    socket.leave(socket.rooms.pop());
  });

  // PRIVATE SESSIONS ===================================================================
  // Teacher
  socket.on('addTeacher', function(user) {
    if (user !== null) {
      // Student available
      if (persist.students.length > 0) {
        // Splice student off student queue, then teacher joins students's room 
        var availableStudent = persist.students.splice(0, 1).toString(); 
        socket.join(availableStudent); 
        // Take teacher and student off client side visual badge
        socket.broadcast.emit('newTeacher');
        socket.emit('match'); 
        socket.broadcast.emit('match');
        // Inform each party
        socket.emit('onMessageAdded', "You have joined student " + availableStudent + "'s room!"); 
        socket.broadcast.to(availableStudent).emit('onMessageAdded', user + " has joined the room as a teacher!"); 
      } else {
        // No student available, push teacher into teacher queue 
        persist.teachers.push(user);
        // Create empty room for teacher 
        socket.join(user); 
        socket.emit('onMessageAdded', "You have connected to room: " + user);
        // Add to client side visual badge
        socket.broadcast.emit('newTeacher');
      }
    } else {
      console.log("username was null");
      return; 
    }
  });

  // Student
  socket.on('addStudent', function(user) {
    if (user !== null) {
      // Teacher available
      if (persist.teachers.length > 0) {
        // Splice teacher off teacher queue, then student joins teacher's room 
        var availableTeacher = persist.teachers.splice(0, 1).toString(); 
        socket.join(availableTeacher); 
        // Take teacher and student off client side visual badge
        socket.broadcast.emit('newStudent'); 
        socket.emit('match'); 
        socket.broadcast.emit('match');
        // Inform each party 
        socket.emit('onMessageAdded', "You have joined teacher " + availableTeacher + "'s room!"); 
        socket.broadcast.to(availableTeacher).emit('onMessageAdded', user + " has joined the room as a student!"); 
      } else {
        // No teachers available, push student into student queue 
        persist.students.push(user);
        // Create empty room for student 
        socket.join(user); 
        socket.emit('onMessageAdded', "You have connected to room: " + user);
        // Add to client side visual badge
        socket.broadcast.emit('newStudent');
      }
    } else {
      console.log("username was null");
      return; 
    }
  });
}; 
