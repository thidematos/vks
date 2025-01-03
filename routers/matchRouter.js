const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .post(matchController.createMatch)
  .get(matchController.getMatchs)
  .delete(matchController.clearMatchs);

module.exports = router;
