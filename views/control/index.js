$(function() {
  let socket = io(),
      colorBtns = $('.light-button');

  colorBtns.on('click', (e) => {
    socket.emit('stoplight', $(e.target).data('color'));
  });
}());