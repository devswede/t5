
const colors = ['red', 'yellow', 'green'];

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
      client.join(room);
      console.log('Client joined ' + room);
    });

    client.on('leave', (room) => {
      client.leave(room);
      console.log('Client left ' + room);
    });

    client.on('stoplight', function(color){
      for (let room in client.rooms) {
        io.to(room).emit('stoplight', color);
      }
      console.log('New color: ' + color);
    });

  };

};