const express = require('express');
const playerController = require('./../controllers/playerController');

const router = express.Router();

router.route('/').get(playerController.getAllPlayers);

router.post('/define-lanes', playerController.defineLanes);

module.exports = router;
