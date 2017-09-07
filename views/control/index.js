$(function() {
  let socket = io(),
      colorBtns = $('.light-button'),
      dummyBtn = $('.btn-dummy'),
      urlBtnContainer = $('.url-btn-container'),
      room = new URLSearchParams(window.location.search).get('room');

  socket.on('connect', () => {
    socket.emit('join', room);
  });

  colorBtns.on('click', (e) => {
    socket.emit('stoplight', $(e.target).data('color'));
  });

  socket.on('config', (config) => {
    let newBtn, i;

    for(i = 0; i < config.iframes.length; i++) {
      newBtn = dummyBtn.clone();
      newBtn.attr('data-url', config.iframes[i].url);
      newBtn.html(config.iframes[i].label);
      newBtn.removeClass('hide');

      newBtn.on('click', (e) => {
        socket.emit('iframe', $(e.target).data('url'));
      });

      urlBtnContainer.append(newBtn);
    }
  });
}());