
const colors = ['red', 'yellow', 'green'];

module.exports = function(io) {

  let colorIndex = 0;

  setInterval(() => {
    if (colorIndex > 2) colorIndex = 0;
    io.emit('stoplight', colors[colorIndex]);
    console.log('EMIT:' + colors[colorIndex]);
    colorIndex++;
  }, 2000);

  return (client) => {

    client.on('event', function(data){});

    client.on('disconnect', function(){});

    client.on('join', function(room){
      socket.join(room);
    });

    client.on('stoplight', function(color, room){
      if (room) {
        io.to(room).emit('stoplight', color);
      } else {
        io.emit('stoplight', color);
      }
      console.log('New color: ' + color);
    });

  };

};