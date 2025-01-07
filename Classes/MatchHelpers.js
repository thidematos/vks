const { format } = require('date-fns/format');
const { getSplashLink } = require('../services/lolApi');

class MatchHelpers {
  #teamInitialsIndexes = {
    start: 0,
    end: 3,
  };

  firstRotationTurns = 6;
  secondRotationTurns = 4;

  jungleCamps = {
    minor: [
      'gromp',
      'wolf',
      'raptor',
      'krug',
      'blueCamp',
      'redCamp',
      'scuttleCrab',
    ],
  };

  #champions;

  constructor(champions) {
    this.#champions = champions;
  }

  participantIDToPlayer(participantID, players) {
    const player = players.find(
      (curPlayer) => curPlayer.participantID === participantID
    );

    return player;
  }

  formatGameTimestamp(timestamp) {
    return format(timestamp, 'mm:ss');
  }

  getRotationPicks(rotation) {
    function structPick(pick) {
      return {
        player: {
          summonerName: pick.summonerName,
          puuid: pick.puuid,
        },
        pickTurn: pick.pickTurn,
        championInfo: this.getChampionBasedOnKey(pick.championID),
      };
    }

    const teamOnePicks = rotation.teamOne
      .filter((player) => player.pickTurn !== 0)
      .map(structPick.bind(this));

    const teamTwoPicks = rotation.teamTwo
      .filter((player) => player.pickTurn !== 0)
      .map(structPick.bind(this));

    return {
      teamOne: teamOnePicks,
      teamTwo: teamTwoPicks,
    };
  }

  getTeamInitials(team) {
    return team
      .at(0)
      .summonerName.slice(
        this.#teamInitialsIndexes.start,
        this.#teamInitialsIndexes.end
      )
      .trim();
  }

  getChampionBasedOnKey(championID) {
    const currentChampion = Object.values(this.#champions).find(
      (champion) => Number(champion.key) === championID
    );

    const championInfo = {
      key: Number(currentChampion.key),
      name: currentChampion.name,
      splash: getSplashLink(currentChampion.id),
    };

    return championInfo;
  }

  iterateBans(ban) {
    return this.getChampionBasedOnKey(ban.championID);
  }

  getTeamPlayers(team, gameInfoParticipants) {
    const players = team.map((player) => {
      return {
        summonerName: player.summonerName,
        puuid: player.puuid,
        participantID: gameInfoParticipants.find(
          (participant) => participant.puuid === player.puuid
        ).participantID,
      };
    });

    return players;
  }
}

module.exports = MatchHelpers;
