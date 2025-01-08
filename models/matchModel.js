const mongoose = require('mongoose');

const matchScheema = new mongoose.Schema({
  wards: {
    killed: [
      {
        formattedTimestamp: String,
        gameTimestamp: Number,
        killer: {
          participantID: Number,
          puuid: String,
          summonerName: String,
        },
        position: {
          x: Number,
          z: Number,
        },
        wardType: String,
      },
    ],
    placed: [
      {
        formattedTimestamp: String,
        gameTimestamp: Number,
        placer: {
          participantID: Number,
          puuid: String,
          summonerName: String,
        },
        position: {
          x: Number,
          z: Number,
        },
        wardType: String,
      },
    ],
  },
});

const Match = mongoose.model('Match', matchScheema);

module.exports = Match;
