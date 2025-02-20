const express = require('express');
const matchController = require('../controllers/matchController');
const lolController = require('./../controllers/lolController');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router
  .route('/')
  .post(
    upload.array('jsonl'),
    matchController.transformJsonlBufferToString,
    matchController.buildMatchEvents,
    matchController.newMatchDetails,
    lolController.getVersions({ currentVersion: false, endpoint: false }),
    lolController.getChampions({ endpoint: false }),
    matchController.defineMatchDetailsData,
    matchController.saveMatch,
    matchController.lookForNewPlayers,
    matchController.dispatchResponse
  )
  .get(matchController.getMatchs)
  .delete(matchController.clearMatchs);

module.exports = router;
