const { format } = require('date-fns/format');
const { getSplashLink } = require('../services/lolApi');
const distanceBetweenTwoPoints = require('../utils/distanceBetweenTwoPoints');

class MatchHelpers {
  #teamInitialsIndexes = {
    start: 0,
    end: 3,
  };

  splitScoreInterval = {
    start: 15,
    end: 30,
  };

  firstRotationTurns = 6;
  secondRotationTurns = 4;

  jungleCamps = [
    'gromp',
    'wolf',
    'raptor',
    'krug',
    'blueCamp',
    'redCamp',
    'scuttleCrab',
    'VoidGrub',
    'riftHerald',
    'baron',
    'dragon',
  ];

  buildingTypes = ['turret', 'inhibitor', 'nexus'];

  criticalTimes = ['10:00', '15:00', '20:00', '25:00'];

  statsTypesOfScreenshots = [
    'MINIONS_KILLED',
    'NEUTRAL_MINIONS_KILLED',
    'NEUTRAL_MINIONS_KILLED_YOUR_JUNGLE',
    'NEUTRAL_MINIONS_KILLED_ENEMY_JUNGLE',
    'CHAMPIONS_KILLED',
    'NUM_DEATHS',
    'ASSISTS',
    'WARD_PLACED',
    'WARD_KILLED',
    'VISION_SCORE',
    'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS',
  ];

  #champions;

  constructor(champions) {
    this.#champions = champions;
  }

  getStateOfEachTeam(stateEvents, teamID) {
    const participantsEvents = stateEvents.map((event) => {
      const teamParticipants = {
        players: null,
        gameTimestamp: null,
        formattedTimestamp: null,
      };

      teamParticipants.players = event.participants.filter(
        (participant) => participant.teamID === teamID
      );

      teamParticipants.gameTimestamp = event.gameTime;
      teamParticipants.formattedTimestamp = format(event.gameTime, 'mm:ss');

      return teamParticipants;
    });

    return participantsEvents;
  }

  getStateInterval(stateEvents, start, end) {
    const interval = stateEvents.filter((event) => {
      if (
        event.formattedTimestamp.endsWith('00') &&
        Number(format(event.gameTimestamp, 'mm')) >= start &&
        Number(format(event.gameTimestamp, 'mm')) <= end
      ) {
        return true;
      }

      return false;
    });

    return interval;
  }

  calculateSplitScores(puuids, statesInterval) {
    const splitScores = puuids.map((puuid) => {
      const splitScore = statesInterval.map((event) => {
        let sumDistance = 0;
        const curPosition = event.players.find(
          (playerEvent) => playerEvent.puuid === puuid
        ).position;

        event.players
          .filter((player) => player.puuid !== puuid)
          .forEach((player) => {
            const playerPosition = player.position;
            const distance = distanceBetweenTwoPoints(
              curPosition,
              playerPosition
            );
            sumDistance += distance;
          });

        return {
          formattedTimestamp: event.formattedTimestamp,
          splitScore: (sumDistance / 4).toFixed(2),
        };
      });

      return { splitScoreData: splitScore, puuid: puuid };
    });

    return splitScores;
  }

  getTeamStatesAtTime(screenshot, teamParticipants, teamID) {
    const curTeamTotals = screenshot.teams.find(
      (curTeam) => curTeam.teamID === teamID
    );

    delete curTeamTotals.teamID;

    return {
      teamParticipants: teamParticipants.map((participant) => {
        const data = {
          xp: participant.XP,
          level: participant.level,
          puuid: participant.puuid,
          totalGold: participant.totalGold,
          teamID: participant.teamID,
        };

        this.statsTypesOfScreenshots.forEach((type) => {
          const formattedStr = type
            .toLowerCase()
            .split('_')
            .map((str, ind) =>
              ind > 0 ? `${str.at(0).toUpperCase()}${str.slice(1)}` : str
            )
            .join('');

          data[formattedStr] = participant.stats.find(
            (stat) => stat.name === type
          ).value;
        });

        return data;
      }),
      gameTimestamp: screenshot.gameTime,
      formattedTimestamp: format(screenshot.gameTime, 'mm:ss'),
      totals: { ...curTeamTotals },
    };
  }

  getGoldAtTime(events, timeStr) {
    const stateAtTime = events.find(
      (event) => event.formattedTimestamp === timeStr
    );

    let sumGold = 0;
    const goldAtTime = {
      ...stateAtTime,
      players: stateAtTime.players.map((player) => {
        sumGold += player.totalGold;
        return { totalGold: player.totalGold, puuid: player.puuid };
      }),
      totalTeamGold: sumGold,
    };

    return goldAtTime;
  }

  getPositions(events) {
    const positions = events.map((state) => {
      return {
        ...state,
        players: state.players.map((player) => {
          return {
            position: player.position,
            puuid: player.puuid,
          };
        }),
      };
    });

    return positions;
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
