var persist = require('./server'); 

module.exports = function(socket) {
  // CANVAS ===================================================== 
  socket.on('canvasChange', function(data) {
    socket.broadcast.to(socket.room).emit('onCanvasChange', data);
  }); 
  socket.on('changePosition', function(data) {
    socket.broadcast.to(socket.room).emit('updatePosition', data);
  }); 

  // PRIVATE SESSIONS ===================================================================
  // Student
  socket.on('addStudent', function(data) {
    if (data.user !== null) {
      // Teacher available
      if (persist.teachers.length > 0) {
        // Splice teacher off teacher queue, then set teacher username to room 
        socket.room = persist.teachers.splice(0, 1).toString(); 
        // Inform teacher of incoming student 
        socket.broadcast.to(socket.room).emit('onMessageAdded', data.user + " has joined the room as a student!"); 
      } else {
        // No teachers available, push student into student queue 
        persist.students.push(data.user);
        // // Set own username as room 
        socket.room = data.user; 
      }
      socket.join(socket.room);
      socket.emit('onMessageAdded', "You have connected to room: " + socket.room);  
    } else {
      console.log("username was null");
      return; 
    }
  });

  // Teacher
  socket.on('addTeacher', function(data) {
    if (data.user !== null) {
      // Student available
      if (persist.students.length > 0) {
        // Splice student off student queue, then set student username to room 
        socket.room = persist.students.splice(0, 1).toString(); 
        // Inform student of incoming teacher 
        socket.broadcast.to(socket.room).emit('onMessageAdded', data.user + " has joined the room as a teacher!"); 
      } else {
        // No student available, push teacher into teacher queue 
        persist.teachers.push(data.user);
        // // Set own username as room 
        socket.room = data.user; 
      }
      socket.join(socket.room);
      socket.emit('onMessageAdded', "You have connected to room: " + socket.room);  
    } else {
      console.log("username was null");
      return; 
    }
  });
  socket.on('join', function(name) {
    console.log(name);

  }); 
  // Disconnect from private session
  socket.on('disconnect', function() {
    console.log("wtf")
    console.log(socket.room)
    socket.emit('onMessageAdded', "You have left room: " + socket.room);  
    socket.leave(socket.room); 
    delete socket.room; 
  }); 

  socket.on('addMessage', function(data) {
    socket.broadcast.to(socket.room).emit('onMessageAdded', data); 
  }); 
}; 
