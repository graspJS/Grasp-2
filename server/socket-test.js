var Room = require('./room.js');

// holds all people connected
var people = {}; 
var rooms = {}; 

// ALLOW PEOPLE TO CONNECT TO SERVER
client.on("join", function(name) {
  roomID = null;
  // client AKA socket holds a unique ID
  // each unique ID holds an object with name and room properties
  people[client.id] = {"name" : name, "room" : roomID};
});

client.on("createRoom", function(name) {  
  var room = new Room(name, socket.id, client.id);
  rooms[socket.id] = room;
  client.room = name; //name the room
  client.join(client.room); //auto-join the creator to the room
  room.addPerson(client.id); //also add the person to the room object
  people[client.id].room = id; //update the room key with the ID of the created room
});

client.on("joinRoom", function(id) {  
    var room = rooms[id];
    if (client.id === room.owner) {
      client.emit("update", "You are the owner of this room and you have already been joined.");
    } else {
      room.people.contains(client.id, function(found) {
          if (found) {
              client.emit("update", "You have already joined this room.");
          } else {
            if (people[client.id].inroom !== null) { //make sure that one person joins one room at a time
              client.emit("update", "You are already in a room ("+rooms[people[client.id].inroom].name+"), please leave it first to join another room.");
            } else {
          room.addPerson(client.id);
          people[client.id].inroom = id;
          client.room = room.name;
          client.join(client.room); //add person to the room
          user = people[client.id];
          socket.sockets.in(client.room).emit("update", user.name + " has connected to " + room.name + " room.");
          client.emit("update", "Welcome to " + room.name + ".");
          client.emit("sendRoomID", {id: id});
        }
          }
      });
    }
  });
