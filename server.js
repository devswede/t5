console.log('Starting.. Cwd:' +  process.cwd());

const express = require('express'),
		  router = require ('./routes/index'),
			app = express(),
			http = require('http').Server(app),
			bodyParser = require('body-parser'),
		  io = require('socket.io')(http);

app.set('view engine', 'hbs');
app.set('views', process.cwd() + '/routes/hbs');

//Middleware
app.use(bodyParser.json());
app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/images', express.static('./public/images'));

app.use('/', router);
app.use('/view/*', router);

router.io = io;

io.on('connection', require('./socket')(io));

http.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});
