const express = require('express');
const matchController = require('../controllers/matchController');
const lolController = require('./../controllers/lolController');

const router = express.Router();

router
  .route('/')
  .post(
    lolController.getVersions({ currentVersion: true, endpoint: false }),
    lolController.getChampions({ endpoint: false }),
    matchController.createMatch
  )
  .get(matchController.getMatchs)
  .delete(matchController.clearMatchs);

module.exports = router;
