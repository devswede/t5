$(function() {
  let socket = io(),
      colorBtns = $('.light-button'),
      dummyBtn = $('.btn-dummy'),
      urlBtnContainer = $('.url-btn-container'),
      dimmer = $('.dimmer'),
      room = new URLSearchParams(window.location.search).get('room'),
      screenTimeout,
      screenTimeOutDelay = 45000;

  screenTimeout = setTimeout(onScreenTimeout, screenTimeOutDelay);

  socket.on('connect', () => {
    socket.emit('join', room);
  });

  socket.on('wake', resetDimmerTimer);

  colorBtns.on('click', (e) => {
    socket.emit('stoplight', $(e.target).data('color'));
  });

  dimmer.on('click', resetDimmerTimer);

  function onScreenTimeout() {
    dimmer.addClass('on');
  }

  function resetDimmerTimer() {
    dimmer.removeClass('on');
    clearTimeout(screenTimeout);
    setTimeout(onScreenTimeout, screenTimeOutDelay);
  }

  socket.on('config', (config) => {
    let newBtn, i;

    urlBtnContainer.empty();

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