const catchAsync = require('../utils/catchAsync');
const MatchExtractor = require('./../Classes/MatchExtractor');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');
const Player = require('../models/playerModel');

exports.extractMatch = catchAsync(async (req, res, next) => {
  const { match } = req.body;

  const { stringJson, stringJsonl } = match;

  if (!stringJson || !stringJsonl)
    return next(new AppError('It seems there is no match to analyze', 400));

  const matchAPI = new MatchExtractor({
    stringJson,
    stringJsonl,
    champions: req.champions,
    version: req.versions,
  });

  req.matchAPI = matchAPI;

  next();
});

exports.createMatch = catchAsync(async (req, res, next) => {
  const { matchAPI } = req;

  const newMatch = await Match.create({
    wards: matchAPI.wards,
    positions: matchAPI.positions,
    plates: matchAPI.plates,
    picks: matchAPI.picks,
    perMinuteStats: matchAPI.perMinuteStats,
    participants: matchAPI.participants,
    jungleMonstersKills: matchAPI.jungleMonstersKills,
    gold: matchAPI.gold,
    gameSettings: matchAPI.gameSettings,
    criticalTimes: matchAPI.criticalTimes,
    buildingsDestroyed: matchAPI.buildingsDestroyed,
    splitScore: matchAPI.splitScores,
    bans: matchAPI.bans,
    featUpdates: matchAPI.featUpdates,
  });

  res.status(200).json({
    status: 'success',
    data: {
      bans: matchAPI.bans,
      picks: matchAPI.picks,
      plates: matchAPI.plates,
      wards: matchAPI.wards,
      participants: matchAPI.participants,
      gameSettings: matchAPI.gameSettings,
      jungleMonstersKills: matchAPI.jungleMonstersKills,
      buildingsDestroyed: matchAPI.buildingsDestroyed,
      splitScore: matchAPI.splitScores,
      positions: matchAPI.positions,
      gold: matchAPI.gold,
      criticalTimes: matchAPI.criticalTimes,
      perMinuteStats: matchAPI.perMinuteStats,
      featUpdates: matchAPI.featUpdates,
    },
  });
});

exports.lookForNewPlayers = catchAsync(async (req, res, next) => {
  const matchAPI = req.matchAPI;

  const dbPlayers = await Player.find({});

  const toAddDb = [];

  matchAPI.participants.allPlayers.forEach((reqPlayer) => {
    const curPlayer = dbPlayers.find(
      (dbPlayer) => dbPlayer.puuid === reqPlayer.puuid
    );

    if (!curPlayer) return toAddDb.push(reqPlayer);
  });

  const promises = toAddDb.map(async (player) => {
    const createdPlayer = await Player.create({
      puuid: player.puuid,
      summonerName: player.summonerName,
      lane: null,
    });

    console.log(`Created new player: ${createdPlayer.summonerName}`);

    return createdPlayer;
  });

  await Promise.all(promises);

  next();
});

exports.getMatchs = catchAsync(async (req, res, next) => {
  const matchs = await Match.find({});

  res.status(200).json({
    status: 'success',
    data: {
      match: matchs,
    },
  });
});

exports.clearMatchs = catchAsync(async (req, res, next) => {
  await Match.deleteMany({});
  await Player.deleteMany({});

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
