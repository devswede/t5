(function() {
  let socket = io();
  socket.on('stoplight', function(color){
    alert(color);
  });
}());