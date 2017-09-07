
const path = require('path'),
      colors = ['red', 'yellow', 'green'],
      rooms = {},
      configs = require(path.join(process.cwd(), 'rooms.json'));

function Room() {
  let color = 'green',
      url = 'http://www.svt.se';

  return {
    color: color,
    url: url,
    messages: []
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
        if (configs[room]) {
          rooms[room].url = configs[room].iframes[0].url;
        }
      }
      client.join(configs[room].room);
      console.log(client.id + ' joined ' + configs[room].room);

      //Send current state to newly connected client
      if (configs[room]) {
        client.emit('state', rooms[room]);
        client.emit('config', configs[room]);
      } else {
        client.emit('state', rooms[room]);
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
          io.to(room).emit('color', color);
          console.log(client.id + ' sets color ' + color + ' for room ' + room);
        }
      }
    });

    //router.io.to(req.params.room).emit('chat', msg);
    client.on('chat', function(msg){
      for (let room in client.rooms) {
        if (room !== client.id) {
          if (!rooms[room]) {
            rooms[room] = new Room();
          }
          rooms[room].messages.push(msg);
          io.to(room).emit('chat', msg);
          console.log(client.id + ' chatted ' + msg + ' in room ' + room);
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