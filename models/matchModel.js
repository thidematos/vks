const mongoose = require('mongoose');
const SchemaObjects = require('../Classes/Schemas');

const schemas = new SchemaObjects();

const matchScheema = new mongoose.Schema({
  bricks: {
    blueSide: [schemas.brick],
    redSide: [schemas.brick],
  },
  champion_kills: {
    blueSide: [schemas.champion_kills],
    redSide: [schemas.champion_kills],
  },
  champion_select: {
    bans: [schemas.bans],
    blind: {
      blueSide: [schemas.pick],
      redSide: [schemas.pick],
      status: Boolean,
    },
    champSelection: {
      firstRotation: {
        blueSide: [schemas.pick],
        redSide: [schemas.pick],
      },
      secondRotation: {
        blueSide: [schemas.pick],
        redSide: [schemas.pick],
      },
    },
  },
  destroyed_buildings: {
    blueSide: [schemas.destroyed_building],
    redSide: [schemas.destroyed_building],
  },
  epic_kills: {
    epics: [schemas.epic_kills.epics],
    minorCamps: [schemas.epic_kills.minorCamps],
  },
  feat_update: {
    feats: [schemas.feats],
    winner: String,
  },
  game_settings: schemas.game_settings,
  participants: {
    all: [schemas.player],
    blueSide: [schemas.player],
    redSide: [schemas.player],
  },
  stats: [schemas.stats],
  wards: {
    killed: [schemas.wards.killed],
    placed: [schemas.wards.placed],
  },
});

const Match = mongoose.model('Match', matchScheema);

module.exports = Match;
