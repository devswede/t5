const express = require('express');

let router = express.Router();

router.get('/display', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

router.get('/control', (req, res, next) => {
  res.sendFile(__dirname + '/control.html');
});

router.get('/api/wake/:room', (req, res, next) => {
  router.io.to(req.params.room).emit('wake');
  console.log(`API - Wake to ${req.params.room}`);
  res.sendStatus(200, 'OK');
});

router.get('/api/stoplight/:room/:color', (req, res, next) => {
  router.io.to(req.params.room).emit('stoplight', req.params.color);
  console.log(`API - Color ${req.params.color} to ${req.params.room}`);
  res.sendStatus(200, 'OK');
});

router.post('/api/github/:room', (req, res, next) => {
  let msg = 'GitHub: ' + req.body.pusher.name + ' pushed to ' + req.body.repository.name;
  router.io.to(req.params.room).emit('chat', msg);
  console.log(`API - GitHub web hook triggered (${msg})`);
  res.sendStatus(200, 'OK');
});


module.exports = router;
