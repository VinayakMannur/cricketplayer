const express = require('express');

const player = require('../controller/player');

const router = express.Router();

router.post('/savePlayer', player.savePlayer);

router.get('/searchPlayer/:name', player.getPlayer);

router.post('/update',player.updatePlayer);

module.exports = router;