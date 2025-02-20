const Player = require('../models/playerModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find({});

  res.status(200).json({
    status: 'success',
    data: {
      players,
    },
  });
});
