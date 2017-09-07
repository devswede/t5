
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

  let colorIndex = 0;

/*
  setInterval(() => {
    if (colorIndex > 2) colorIndex = 0;
    io.emit('stoplight', colors[colorIndex]);
    console.log('EMIT:' + colors[colorIndex]);
    colorIndex++;
  }, 2000);
*/
  return (client) => {

    console.log('Client connected');

    client.on('event', function(data){});

    client.on('disconnect', function(){});

    client.on('join', (room) => {

      if (!rooms[room]) {
        console.log('Room created: ' + room);
        rooms[room] = new Room();
      }
      client.join(room);

      //Send current state to newly connected client
      client.emit('state', rooms[room]);
      if (configs[room]) {
        console.log('Emit state for ' + room);
        client.emit('config', configs[room]);
      } else {
        console.log('Emit default state for ' + room);
        client.emit('config', configs['default']);
      }

      console.log('Client joined ' + room);
    });

    client.on('leave', (room) => {
      client.leave(room);
      console.log('Client left ' + room);
    });

    client.on('stoplight', function(color){
      for (let room in client.rooms) {

        if (!rooms[room]) {
          rooms[room] = new Room();
        }
        rooms[room].color = color;

        io.to(room).emit('stoplight', color);
      }
      console.log('Color: ' + color);
    });

    client.on('iframe', function(url){
      for (let room in client.rooms) {

        if (!rooms[room]) {
          rooms[room] = new Room();
        }
        rooms[room].url = url;

        io.to(room).emit('iframe', url);
      }
      console.log('IFrame: ' + url);
    });

  };

};