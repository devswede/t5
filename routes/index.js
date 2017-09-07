const express = require('express');

let router = express.Router();

router.get('/display', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

module.exports = router;
