
$(function() {
  let socket = io(),
      colorBtns = $('.light-button'),
      dummyBtn = $('.btn-dummy'),
      stoplight = $('.js-stoplight'),
      messages = $('.js-message'),
      urlBtnContainer = $('.url-btn-container'),
      dimmer = $('.dimmer'),
      screen = new URLSearchParams(window.location.search).get('screen'),
      msgForm = $('.js-msg-form'),
      screenTimeout,
      screenTimeOutDelay = 45000;

  if (screen === 'team5') {
    document.title = 'Styr extern skärm - Team 5'
  } else if (screen === 'in5') {
    document.title = 'Styr intern skärm - Team 5'
  }

  screenTimeout = setTimeout(onScreenTimeout, screenTimeOutDelay);

  socket.on('connect', () => {
    socket.emit('join', screen);
  });

  socket.on('wake', resetDimmerTimer);

  colorBtns.on('click', (e) => {
    socket.emit('stoplight', $(e.target).data('color'));
  });

  msgForm.on('submit', function(e) {
    var msg = $('.js-chat-msg')[0].value;
    socket.emit('chat', msg);
    $('.js-chat-msg')[0].value = '';
    e.preventDefault();
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

    if (config.stoplight) {
      stoplight.removeClass('hide');
    } else {
      stoplight.addClass('hide');
    }

    if (config.chat) {
      messages.removeClass('hide');
    } else {
      messages.addClass('hide');
    }

    for(i = 0; i < config.iframes.length; i++) {
      newBtn = dummyBtn.clone();
      newBtn.attr('data-url', config.iframes[i].url);
      newBtn.html(config.iframes[i].label);
      newBtn.removeClass('hide');
      newBtn.on('click', (e) => {
        socket.emit('iframe', {screen: screen, url: $(e.target).data('url')});
      });

      urlBtnContainer.append(newBtn);
    }
  });
}());