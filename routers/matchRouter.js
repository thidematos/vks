const express = require('express');
const matchController = require('../controllers/matchController');
const lolController = require('./../controllers/lolController');

const router = express.Router();

router
  .route('/')
  .post(
    matchController.buildMatchEvents,
    matchController.newMatchDetails,
    lolController.getVersions({ currentVersion: false, endpoint: false }),
    lolController.getChampions({ endpoint: false }),
    matchController.defineMatchDetailsData

    /*  
    
    matchController.extractMatch,
    matchController.lookForNewPlayers,
    matchController.createMatch */
  )
  .get(matchController.getMatchs)
  .delete(matchController.clearMatchs);

module.exports = router;
