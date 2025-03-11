const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Match = require('./../models/matchModel');
const Player = require('../models/playerModel');
const Parser = require('../Classes/Parser');
const MatchEvents = require('../Classes/MatchEvents');
const MatchDetails = require('../Classes/MatchDetails');

const parser = new Parser();

exports.transformJsonlBufferToString = async (req, res, next) => {
  //console.log(req.files);

  const promises = req.files.map(async (file) => {
    const blobJsonl = new Blob([file.buffer]);

    const stringJsonl = await blobJsonl.text();

    return stringJsonl;
  });

  req.dataStrings = await Promise.all(promises);

  next();
};

exports.buildMatchEvents = catchAsync(async (req, res, next) => {
  console.log('current pipeline --> buildMatchEvents');

  const allMatchEvents = req.dataStrings.map((string) => parser.jsonl(string));

  req.allMatchEvents = allMatchEvents;

  next();
});

exports.newMatchDetails = catchAsync(async (req, res, next) => {
  console.log('current pipeline --> new Match Details');

  const allMatchEvents = req.allMatchEvents.map(
    (event) => new MatchEvents(event)
  );
  const allMatchDetails = allMatchEvents.map(
    (matchEvent) => new MatchDetails(matchEvent)
  );

  req.allMatchDetails = allMatchDetails;

  next();
});

exports.defineMatchDetailsData = catchAsync(async (req, res, next) => {
  console.log('current pipeline --> define Match Details Data');
  req.allMatchDetails.forEach((matchDetail) => matchDetail.defineData());

  next();
});

exports.lookForNewPlayers = catchAsync(async (req, res, next) => {
  console.log('current pipeline --> look for new players');

  if (req.alreadyExists) {
    return next();
  }

  for (let ind = 0; ind < req.allMatchDetails.length; ind++) {
    const MatchDetails = req.allMatchDetails[ind];

    const dbPlayers = await Player.find({});

    const toAddDB = [];

    const toUpdateDB = [];

    MatchDetails.participants.all.forEach((reqPlayer) => {
      const curPlayer = dbPlayers.find(
        (dbPlayer) => dbPlayer.puuid === reqPlayer.puuid
      );

      if (!curPlayer)
        return toAddDB.push({
          player: reqPlayer,
          gameID: MatchDetails.game_settings.gameID,
        });

      toUpdateDB.push({
        player: curPlayer,
        gameID: MatchDetails.game_settings.gameID,
      });
    });

    if (toUpdateDB.length !== 0) {
      for (let i = 0; i < toUpdateDB.length; i++) {
        const data = toUpdateDB[i];

        data.player.matchs.push(data.gameID);

        console.log(`Updated player: ${data.player.summonerName}`);

        await data.player.save();
      }
    }

    if (toAddDB.length !== 0) {
      for (let k = 0; k < toAddDB.length; k++) {
        const data = toAddDB[k];

        const createdPlayer = await Player.create({
          puuid: data.player.puuid,
          summonerName: data.player.summonerName,
          lane: data.player.lane,
          matchs: [data.gameID],
        });

        console.log(`Created new player: ${createdPlayer.summonerName}`);
      }
    }
  }

  next();
});

exports.saveMatch = catchAsync(async (req, res, next) => {
  console.log('current pipeline --> save match');

  const matchs = [];

  req.alreadyExists = false;

  for (let ind = 0; ind < req.allMatchDetails.length; ind++) {
    const MatchDetails = req.allMatchDetails[ind];

    console.log(MatchDetails.game_settings.gameID);

    const matchAlreadyExists = await Match.findOne({
      'game_settings.gameID': MatchDetails.game_settings.gameID,
    });

    if (matchAlreadyExists) {
      req.alreadyExists = true;
      continue;
    }

    const match = await Match.create({
      participants: MatchDetails.participants,
      game_settings: MatchDetails.game_settings,
      wards: MatchDetails.wards,
      stats: MatchDetails.stats,
      feat_update: MatchDetails.feat_update,
      epic_kills: MatchDetails.epic_kills,
      champion_kills: MatchDetails.champion_kills,
      champion_select: MatchDetails.champion_select,
      bricks: MatchDetails.bricks,
      destroyed_buildings: MatchDetails.destroyed_buildings,
    });

    matchs.push(match);
  }

  console.log(matchs);

  req.matchs = matchs;

  next();
});

exports.dispatchResponse = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { match: req.matchs },
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
