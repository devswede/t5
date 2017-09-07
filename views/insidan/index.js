$(function() {
  let socket = io(),
      chat = $('.js-chat'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', function() {
    socket.emit('join', room);
  });

  socket.on('state', state => {

  });

  socket.on('chat', msg => {
    chat.append('<p>' + msg + '</p>')
  });
}());
