
const path = require('path'),
      colors = ['red', 'yellow', 'green'],
      rooms = {},
      configs = require(path.join(process.cwd(), 'rooms.json'));

function Room() {
  let color = 'green',
      url = 'http://www.svt.se';

  return {
    color: color,
    url: url
  };
};

module.exports = function(io) {

  return (client) => {

    console.log('Client connected: ' + client.id);

    client.on('disconnect', () => {
      console.log('Client disconnected: ' + client.id);
    });

    client.on('join', (room) => {

      if (!rooms[room]) {
        console.log('Room created: ' + room);
        rooms[room] = new Room();
      }
      client.join(room);
      console.log(client.id + ' joined ' + room);

      //Send current state to newly connected client
      client.emit('state', rooms[room]);
      if (configs[room]) {
        client.emit('config', configs[room]);
      } else {
        client.emit('config', configs['default']);
      }

    });

    client.on('leave', (room) => {
      client.leave(room);
      console.log(client.id + ' left ' + room);
    });

    client.on('stoplight', function(color){
      for (let room in client.rooms) {
        if (room !== client.id) {
          if (!rooms[room]) {
            rooms[room] = new Room();
          }
          rooms[room].color = color;
          io.to(room).emit('stoplight', color);
          console.log(client.id + ' sets color ' + color + ' for room ' + room);
        }
      }
    });

    client.on('iframe', function(url){
      for (let room in client.rooms) {
        if (room !== client.id) {
          if (!rooms[room]) {
            rooms[room] = new Room();
          }
          rooms[room].url = url;
          io.to(room).emit('iframe', url);
          console.log(client.id + ' sets iframe ' + url + ' for room ' + room);
        }
      }
    });

  };

};