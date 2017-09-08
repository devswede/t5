
$(function() {
  let socket = io(),
      colorBtns = $('.light-button'),
      dummyBtn = $('.btn-dummy'),
      stoplight = $('.js-stoplight'),
      messages = $('.js-message'),
      urlBtnContainer = $('.url-btn-container'),
      dimmer = $('.dimmer'),
      screen = new URLSearchParams(window.location.search).get('screen'),
      useKeyboard = (new URLSearchParams(window.location.search).get('keyboard') === '1'),
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

  function enableKeyboard() {
    $('#keyboard').keyboard({
      language     : 'sv',  // string or array
      layout       : 'ms-Swedish',
      position : {
        of : null,
        my : 'center bottom',
        at : 'center bottom',
        at2: 'center bottom'
      },
      reposition : true,
      usePreview : true,
      alwaysOpen : false,
      noFocus : false,
      userClosed : false,
      autoAccept : true,
      ignoreEsc : false,
      closeByClickEvent : false,
      css : {
        input          : 'ui-widget-content ui-corner-all',
        container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix',
        popup: '',
        buttonDefault  : 'ui-state-default ui-corner-all',
        buttonHover    : 'ui-state-hover',
        buttonAction   : 'ui-state-active',
        buttonDisabled : 'ui-state-disabled',
        buttonEmpty    : 'ui-keyboard-empty'
      },
      appendTo : 'body',
      resetDefault : false,
      openOn : 'focus',
      keyBinding : 'mousedown touchstart',
      useCombos : true,
      initialized   : function(e, keyboard, el) {},
      beforeVisible : function(e, keyboard, el) {},
      visible       : function(e, keyboard, el) {},
      beforeInsert  : function(e, keyboard, el, textToAdd) { return textToAdd; },
      change        : function(e, keyboard, el) {},
      beforeClose   : function(e, keyboard, el, accepted) {},
      accepted      : function(e, keyboard, el) {},
      canceled      : function(e, keyboard, el) {},
      restricted    : function(e, keyboard, el) {},
      hidden        : function(e, keyboard, el) {},
      switchInput : function(keyboard, goToNext, isAccepted) {},
      create : function(keyboard) { return keyboard.buildKeyboard(); },
      buildKey : function( keyboard, data ) {
        return data;
      },
      validate : function(keyboard, value, isClosing) {
        return true;
      }

    });
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
      if (useKeyboard) enableKeyboard();
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