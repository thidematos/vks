const catchAsync = require('../utils/catchAsync');
const MatchExtractor = require('./../Classes/MatchExtractor');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');

exports.extractMatch = catchAsync(async (req, res, next) => {
  const { match } = req.body;

  const { stringJson, stringJsonl } = match;

  if (!stringJson || !stringJsonl)
    return next(new AppError('It seems there is no match to analyze', 400));

  const matchAPI = new MatchExtractor({
    stringJson,
    stringJsonl,
    champions: req.champions,
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
    },
  });
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

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
