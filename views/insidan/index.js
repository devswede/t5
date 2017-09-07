$(function() {
  let socket = io(),
      chat = $('.js-chat'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', function() {
    socket.emit('join', room);
  });

  socket.on('state', state => {
    if (state.messages) {
      for (var i = 0; i < state.messages.length; i++) {
        chat.append('<p>' + state.messages[i] + '</p>')
      }
    }
  });

  socket.on('chat', msg => {
    chat.append('<p>' + msg + '</p>')
  });
}());
