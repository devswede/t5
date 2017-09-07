$(function() {
  let socket = io(),
      redLight = $('.red'),
      greenLight = $('.green'),
      allLights = $('.light'),
      iframe = $('.display-iframe'),
      chat = $('.js-chat'),
      room = new URLSearchParams(window.location.search).get('room');


  if (room === 'team5') {
    document.title = 'Team 5 - Extern'
  } else if (room === 'in5') {
    document.title = 'Team 5 - Intern'
  }

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

  //socket.on('chat', (msg) => {
    //chat.append('<p>' + msg + '</p>')
  //});

  function updateQR() {
    var controlUrl = window.location.origin + '/control?room=' + room;
    var qr = new QRious({
      element: document.getElementById('qr'),
      value: controlUrl,
      size: 80
    });
    iframe.height($(window).height() - $('.top-content').height());
  }

  function updateLight(color) {
    allLights.removeClass('light-up');
    switch(color) {
      case 'red':
        redLight.addClass('light-up');
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