$(function() {
  let socket = io(),
      redLight = $('.red'),
      yellowLight = $('.yellow'),
      greenLight = $('.green'),
      allLights = $('.light'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', function() {
    socket.emit('join', room);
  });

  socket.on('stoplight', color => {
    allLights.removeClass('light-up');
    switch(color) {
      case 'red':
        redLight.addClass('light-up');
        break;
      case 'yellow':
        yellowLight.addClass('light-up');
        break;
      case 'green':
        greenLight.addClass('light-up');
        break;
    }
  });
}());