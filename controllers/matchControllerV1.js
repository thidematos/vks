const catchAsync = require('../utils/catchAsync');
const MatchExtractor = require('../Classes/MatchExtractor');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');

exports.createMatch = catchAsync(async (req, res, next) => {
  const { match } = req.body;

  const { stringJson, stringJsonl } = match;

  if (!stringJson || !stringJsonl)
    return next(new AppError('It seems there is no match to analyze', 400));

  const jsonConverted = JSON.parse(stringJson);

  const matchAPI = new MatchExtractor(jsonConverted)
    .defineParticipantsFrames()
    .getEvents();

  const jsonlConverted = matchAPI.convertJsonl(stringJsonl);

  const createdMatch = await Match.create({
    gameId: matchAPI.gameId,
    timestamp: matchAPI.timestamp,
    participants: matchAPI.participants,
  });

  res.status(200).json({
    status: 'success',
    data: {
      match,
      participants: matchAPI.participants,
      gameId: matchAPI.gameId,
      frames: matchAPI.frames,
      timestamp: matchAPI.timestamp,
      dragonStats: matchAPI.getFirstDragonKillTimestamp(),
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
