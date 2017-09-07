import express from 'express';
import router from './routes/index';

//var displayFn = require('./routes/display');
let app = express();

app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));

//app.get('/display', displayFn);

app.use('/', router);
app.use('/view/*', router);

/*const io = require('socket.io')(app);
io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});
*/

app.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});
