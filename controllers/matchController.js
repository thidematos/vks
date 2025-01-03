const catchAsync = require('../utils/catchAsync');
const MatchExtractor = require('./../classes/MatchExtractor');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');

exports.createMatch = catchAsync(async (req, res, next) => {
  const { match: matchString } = req.body;

  if (!matchString)
    return next(new AppError('It seems there is no match to analyze', 400));

  const match = JSON.parse(matchString);

  const matchAPI = new MatchExtractor(match)
    .defineParticipantsFrames()
    .getEvents();

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
      createdMatch,
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
