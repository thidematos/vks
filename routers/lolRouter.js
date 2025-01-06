const express = require('express');
const lolController = require('../controllers/lolController');

const router = express.Router();

router.get(
  '/versions',
  lolController.getVersions({ endpoint: true, currentVersion: true })
);

router.get(
  '/champions',
  lolController.getVersions({ endpoint: false, currentVersion: true }),
  lolController.getChampions({ endpoint: true })
);

module.exports = router;
