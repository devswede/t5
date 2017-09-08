$(function() {
  let socket = io(),
      chat = $('.js-chat'),
      room = new URLSearchParams(window.location.search).get('room'),
      synth = window.speechSynthesis;

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
    let synthMsg = new SpeechSynthesisUtterance('Nytt meddelande ... ' + msg),
        voice = voice || synth.getVoices().find(voice => { return voice.lang === 'sv-SE'; });
    synthMsg.voice = voice;
    synthMsg.rate = 0.7;
    synth.speak(synthMsg);
    chat.prepend('<p>' + msg + '</p>')
  });
}());
