
const path = require('path'),
      screens = {},
      rooms = {},
      configs = require(path.join(process.cwd(), 'screens.json'));


function Room() {
  let color = 'green',
      messages = [];
  return {
    color: color,
    messages: []
  };
}

function Screen() {
  let url = 'http://www.svt.se';
  return {
    url: url
  };
}

module.exports = function(io) {

  return (client) => {

    console.log('Client connected: ' + client.id);

    client.on('disconnect', () => {
      console.log('Client disconnected: ' + client.id);
    });

    client.on('join', (screenName) => {
      let roomName = configs[screenName] ? configs[screenName].room : 'default';

      if (!screens[screenName]) {
        let screen = new Screen();
        if (configs[screenName]) {
          screen.url = configs[screenName].iframes[0].url;
        }
        screens[screenName] = screen;
        console.log('Screen created: ' + screenName);
        if (!rooms[roomName]) {
          rooms[roomName] = new Room();
          console.log('Room created: ' + roomName);
        }
      }

      //Send current state to newly connected client
      client.join(roomName);
      console.log(client.id + ' joined ' + roomName);
      client.emit('state', Object.assign({screen: screenName}, screens[screenName], rooms[roomName]));
      client.emit('config', configs[screenName]);

    });

    client.on('leave', (screenName) => {
      client.leave(configs[screenName].room);
      console.log(client.id + ' left ' + configs[screenName].room);
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
          io.to(room).emit('color', 'flash');
          setTimeout(function() {
            io.to(room).emit('color', rooms[room].color);
          }, 2000);
          console.log(client.id + ' chatted ' + msg + ' in room ' + room);
        }
      }
    });

    client.on('iframe', function(iframe){
      for (let room in client.rooms) {
        if (room !== client.id) {
          if (!screens[iframe.screen]) {
            screens[iframe.screen] = new Screen();
          }
          screens[iframe.screen].url = iframe.url;
          io.to(room).emit('iframe', iframe);
          console.log(client.id + ' sets iframe ' + iframe.url + ' for screen ' + iframe.screen);
        }
      }
    });

  };

};