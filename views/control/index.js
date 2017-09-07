$(function() {
  let socket = io(),
      colorBtns = $('.light-button'),
      urlBtns = $('.url-button'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', function() {
    socket.emit('join', room);
  });

  colorBtns.on('click', (e) => {
    socket.emit('stoplight', $(e.target).data('color'));
  });

  urlBtns.on('click', (e) => {
    socket.emit('iframe', $(e.target).data('url'));
  });
}());