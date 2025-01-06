const { events } = require('../models/matchModel');
const Parser = require('./Parser');
const { getSplashLink } = require('./../services/lolApi');

const parser = new Parser();

class MatchExtractor {
  #gameStages = {
    preChampSelect: 'PRE_CHAMP_SELECT',
  };

  bans = {
    firstRotatation: null,
  };

  constructor({ stringJson, stringJsonl }) {
    this.eventsJsonl = parser.jsonl(stringJsonl);
    this.endDetailsJson = parser.json(stringJson);
  }

  getBanList(champions) {
    const firstRotation = this.eventsJsonl
      .filter((event) => event.gameState === this.#gameStages.preChampSelect)
      .filter((pick) => pick.bannedChampions.length === 6)
      .at(0).bannedChampions;

    firstRotation.forEach((ban) => {
      const currentBan = Object.values(champions).find(
        (champion) => Number(champion.key) === ban.championID
      );

      ban.championId = {
        key: Number(currentBan.key),
        name: currentBan.name,
        splash: getSplashLink(currentBan.id),
      };
    });

    this.bans.firstRotatation = firstRotation;

    return this;
  }
}

module.exports = MatchExtractor;
