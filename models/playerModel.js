const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  puuid: {
    type: String,
    unique: true,
  },
  summonerName: String,
  lane: {
    type: String,
    enum: ['top', 'jungle', 'mid', 'adc', 'supp'],
  },
  matchs: [Number],
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
