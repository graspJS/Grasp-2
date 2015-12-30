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
  client.emit("update", "You have connected to the server.");
  socket.sockets.emit("update", people[client.id].name + " is online.")
  socket.sockets.emit("update-people", people);
  client.emit("roomList", {rooms: rooms});
});

client.on("createRoom", function(name) {  
  if (people[client.id].room === null) {
    var id = uuid.v4();
    var room = new Room(name, id, client.id);
    rooms[id] = room;
    socket.sockets.emit("roomList", {rooms: rooms}); //update the list of rooms on the frontend
    client.room = name; //name the room
    client.join(client.room); //auto-join the creator to the room
    room.addPerson(client.id); //also add the person to the room object
    people[client.id].room = id; //update the room key with the ID of the created room
  } else {
    socket.sockets.emit("update", "You have already created a room.");
  }
});
