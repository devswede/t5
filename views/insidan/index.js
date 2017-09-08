$(function() {
  let socket = io(),
      chat = $('.js-chat'),
      room = new URLSearchParams(window.location.search).get('room'),
      synth = window.speechSynthesis,
      voice = synth.getVoices().find(voice => { return voice.lang === 'sv-SE'; });

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
    let synthMsg = new SpeechSynthesisUtterance(msg);
    synthMsg.voice = voice;
    synth.speak(synthMsg);
    chat.append('<p>' + msg + '</p>')
  });
}());
