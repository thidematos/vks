const catchAsync = require('../utils/catchAsync');
const MatchExtractor = require('./../classes/MatchExtractor');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');

exports.createMatch = catchAsync(async (req, res, next) => {
  const { match } = req.body;

  const { stringJson, stringJsonl } = match;

  if (!stringJson || !stringJsonl)
    return next(new AppError('It seems there is no match to analyze', 400));

  const jsonConverted = JSON.parse(stringJson);

  const matchAPI = new MatchExtractor(jsonConverted);

  const jsonlConverted = matchAPI.convertJsonl(stringJsonl);

  res.status(200).json({
    status: 'success',
    data: {},
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
