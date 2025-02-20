const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');
const Player = require('../models/playerModel');
const Parser = require('../Classes/Parser');
const MatchEvents = require('../Classes/MatchEvents');
const MatchDetails = require('../Classes/MatchDetails');

const parser = new Parser();

exports.buildMatchEvents = catchAsync(async (req, res, next) => {
  const { match } = req.body;

  const { stringJsonl } = match;

  if (!stringJsonl)
    return next(new AppError('It seems there is no match to analyze', 400));

  const matchEvents = parser.jsonl(stringJsonl);

  req.matchEvents = matchEvents;

  next();
});

exports.newMatchDetails = catchAsync(async (req, res, next) => {
  const matchEvents = new MatchEvents(req.matchEvents);
  const matchDetails = new MatchDetails(matchEvents);

  req.matchDetails = matchDetails;

  next();
});

exports.defineMatchDetailsData = catchAsync(async (req, res, next) => {
  req.matchDetails.defineData();

  next();
});

exports.lookForNewPlayers = catchAsync(async (req, res, next) => {
  const dbPlayers = await Player.find({});

  const toAddDb = [];

  const toUpdateDB = [];

  req.matchDetails.participants.all.forEach((reqPlayer) => {
    const curPlayer = dbPlayers.find(
      (dbPlayer) => dbPlayer.puuid === reqPlayer.puuid
    );

    if (!curPlayer) return toAddDb.push(reqPlayer);

    toUpdateDB.push(curPlayer);
  });

  if (toUpdateDB.length !== 0) {
    const promises = toUpdateDB.map(async (player) => {
      player.matchs.push(req.matchDetails.game_settings.gameID);

      console.log(`Updated player: ${player.summonerName}`);

      await player.save();

      return;
    });

    await Promise.all(promises);
  }

  if (toAddDb.length !== 0) {
    const promises = toAddDb.map(async (player) => {
      const createdPlayer = await Player.create({
        puuid: player.puuid,
        summonerName: player.summonerName,
        lane: player.lane,
        matchs: [req.matchDetails.game_settings.gameID],
      });

      console.log(`Created new player: ${createdPlayer.summonerName}`);

      return createdPlayer;
    });

    await Promise.all(promises);
  }

  next();
});

exports.saveMatch = catchAsync(async (req, res, next) => {
  console.log(req.matchDetails.game_settings.gameID);

  const matchAlreadyExists = await Match.findOne({
    'game_settings.gameID': req.matchDetails.game_settings.gameID,
  });

  if (matchAlreadyExists) {
    return next(
      new AppError('This match already exists in the Database!', 400)
    );
  }

  const match = await Match.create({
    participants: req.matchDetails.participants,
    game_settings: req.matchDetails.game_settings,
    wards: req.matchDetails.wards,
    stats: req.matchDetails.stats,
    feat_update: req.matchDetails.feat_update,
    epic_kills: req.matchDetails.epic_kills,
    champion_kills: req.matchDetails.champion_kills,
    champion_select: req.matchDetails.champion_select,
    bricks: req.matchDetails.bricks,
    destroyed_buildings: req.matchDetails.destroyed_buildings,
  });

  req.match = match;

  next();
});

exports.dispatchResponse = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.match,
  });
};

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
