
module.exports = function(io) {

  return (client) => {
    client.on('event', function(data){});

    client.on('disconnect', function(){});

    client.on('stoplight', function(color){
      io.emit('stoplight', color);
      console.log('New color: ' + color);
    });

  };

};