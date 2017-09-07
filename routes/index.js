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
  console.log('Wake emit to ' + req.params.room);
});

router.get('/api/stoplight/:room/:color', (req, res, next) => {
  router.io.to(req.params.room).emit('stoplight', req.params.color);
  console.log('Color from API');
});

module.exports = router;
