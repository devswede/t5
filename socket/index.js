
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

    client.on('stoplight', function(color){
      io.emit('stoplight', color);
      console.log('New color: ' + color);
    });

  };

};