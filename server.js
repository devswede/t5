const express = require('express'),
		  router = require ('./routes/index'),
			app = express(),
			http = require('http').Server(app),
		  io = require('socket.io')(http);

app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));


app.use('/', router);
app.use('/view/*', router);

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});


http.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});
