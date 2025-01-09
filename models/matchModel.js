const mongoose = require('mongoose');
const SchemaObjects = require('../Classes/SchemaObjects');

const schemaObjects = new SchemaObjects();

const matchScheema = new mongoose.Schema({
  wards: {
    killed: schemaObjects.wards.killed,
    placed: schemaObjects.wards.placed,
  },
  positions: {
    teamOne: schemaObjects.positions.team,
    teamTwo: schemaObjects.positions.team,
  },
  plates: {
    destroyed: [
      {
        assistants: [Number],
        belongsToTeamID: Number,
        formattedTimestamp: String,
        gameTimestamp: Number,
        lane: String,
        lastHitter: schemaObjects.completePlayerInfo,
      },
    ],
    goldEarned: [
      {
        earner: schemaObjects.completePlayerInfo,
        formattedTimestamp: String,
        gameTimestamp: Number,
        goldBounty: Number,
        teamIDWhoDestroyed: Number,
      },
    ],
  },
  picks: {
    firstRotation: schemaObjects.picks.rotation,
    secondRotation: schemaObjects.picks.rotation,
  },
  perMinuteStats: {
    teamOne: schemaObjects.perMinuteStats,
    teamTwo: schemaObjects.perMinuteStats,
  },
  participants: {
    allPlayers: [schemaObjects.completePlayerInfo],
    teamOne: schemaObjects.participants.team,
    teamTwo: schemaObjects.participants.team,
  },
  jungleMonstersKills: {
    baron: [schemaObjects.jungleMonstersKills.monsterData],
    buffCamps: {
      blueCamp: [schemaObjects.jungleMonstersKills.monsterData],
      redCamp: [schemaObjects.jungleMonstersKills.monsterData],
    },
    dragon: [schemaObjects.jungleMonstersKills.dragonData],
    minorCamps: {
      gromp: [schemaObjects.jungleMonstersKills.monsterData],
      krug: [schemaObjects.jungleMonstersKills.monsterData],
      raptor: [schemaObjects.jungleMonstersKills.monsterData],
      wolf: [schemaObjects.jungleMonstersKills.monsterData],
    },
    riftHerald: [schemaObjects.jungleMonstersKills.monsterData],
    scuttleCrab: [schemaObjects.jungleMonstersKills.monsterData],
    voidGrubs: [schemaObjects.jungleMonstersKills.monsterData],
    ruinousAtakhan: [schemaObjects.jungleMonstersKills.atakhanData],
    voraciousAtakhan: [schemaObjects.jungleMonstersKills.atakhanData],
  },
  gold: {
    at10: schemaObjects.goldAtTime,
    at15: schemaObjects.goldAtTime,
    at20: schemaObjects.goldAtTime,
    at25: schemaObjects.goldAtTime,
  },
  gameSettings: {
    gameID: Number,
    name: String,
    patch: String,
    timestamp: String,
    gameDurationTimestamp: Number,
    gameDuration: String,
    winningTeam: Number,
  },
  criticalTimes: {
    at10: schemaObjects.criticalTimes.time,
    at15: schemaObjects.criticalTimes.time,
    at20: schemaObjects.criticalTimes.time,
    at25: schemaObjects.criticalTimes.time,
  },
  buildingsDestroyed: {
    inhibitor: [schemaObjects.buildingsDestroyed.inhibitor],
    nexus: [schemaObjects.buildingsDestroyed.nexus],
    turret: [schemaObjects.buildingsDestroyed.turret],
  },
  bans: {
    firstRotation: [schemaObjects.bans.rotation],
    secondRotation: [schemaObjects.bans.rotation],
  },
  splitScore: {
    teamOne: [schemaObjects.splitScore.score],
    teamTwo: [schemaObjects.splitScore.score],
  },
  featUpdates: {
    kFirstBlood: [schemaObjects.featUpdate],
    kEpicKill: [schemaObjects.featUpdate],
    kFirstTurret: [schemaObjects.featUpdate],
  },
});

const Match = mongoose.model('Match', matchScheema);

module.exports = Match;
