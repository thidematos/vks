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

exports.defineLanes = catchAsync(async (req, res, next) => {
  const { lanes } = req.body;

  console.log(lanes);

  const puuids = Object.keys(lanes);

  const promises = puuids.map(async (puuid) => {
    const newPlayer = await Player.updateOne(
      { puuid: puuid },
      { lane: lanes[puuid] }
    );

    return newPlayer;
  });

  const updatedPlayers = await Promise.all(promises);

  res.status(200).json({
    status: 'succes',
    data: {
      players: updatedPlayers,
    },
  });
});
