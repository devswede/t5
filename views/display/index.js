$(function() {
  let socket = io(),
      redLight = $('.red'),
      yellowLight = $('.yellow'),
      greenLight = $('.green'),
      allLights = $('.light'),
      iframe = $('.display-iframe'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', function() {
    socket.emit('join', room);
  });

  socket.on('iframe', updateIframeSource);
  socket.on('stoplight', updateLight);

  socket.on('state', state => {
    updateIframeSource(state.url);
    updateLight(state.color);
    updateQR();
  });

  function updateQR() {
    var qr = new QRious({
      element: document.getElementById('qr'),
      value: 'https://github.com/neocotic/qrious'
    });
  }

  function updateLight(color) {
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
  }

  function updateIframeSource(url) {
    iframe.attr('src', url)
  }

}());