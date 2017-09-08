const express = require('express');

let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/display', (req, res, next) => {
  res.render('display');
});

router.get('/control', (req, res, next) => {
  res.render('control');
});

/*
Extern skärm frames
 */
router.get('/team', (req, res, next) => {
  res.render('frames/team');
});

router.get('/start', (req,res,next) => {
  res.render('frames/start');
});

/*
Intern skärm frames
 */
router.get('/insidan', (req,res,next) => {
  res.render('frames/insidan');
});

/*
 API's
 */
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
  let msg = req.body.pusher.name + ' .. har laddat upp ny version till .. ' + req.body.repository.name;
  router.io.to(req.params.room).emit('chat', msg);
  router.io.to(req.params.room).emit('color', 'flash');
  console.log(`API - GitHub web hook triggered (${msg})`);
  res.sendStatus(200, 'OK');
});

module.exports = router;
