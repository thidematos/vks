const helpers = require('./../utils/helpers');

class MatchEvents {
  #rfcPropertyName = 'rfc461Schema';
  #TEAM_LENGTH = 5;
  #BLUE_SIDE_ID = 100;
  #RED_SIDE_ID = 200;
  #champions = [];
  #patch;
  #lanes = ['top', 'jungle', 'mid', 'adc', 'supp'];

  #game_info = [];
  #champ_select = [];
  #stats_update = [];
  #ward_placed = [];
  #epic_monster_kill = [];
  #ward_killed = [];
  #champion_kill = [];
  #champion_kill_special = [];
  #feat_updated = [];
  #turret_plate_destroyed = [];
  #turret_plate_gold_earned = [];
  #building_destroyed = [];
  #building_gold_grant = [];
  #game_end = [];

  constructor(matchEvents) {
    this.#defineEvents(matchEvents);
  }

  //BASE DEFINIERS
  #defineEvents(matchEvents) {
    matchEvents.forEach((event) => {
      switch (event[this.#rfcPropertyName]) {
        case 'game_info':
          this.#game_info.push(event);
          break;
        case 'champ_select':
          this.#champ_select.push(event);
          break;
        case 'stats_update':
          this.#stats_update.push(event);
          break;
        case 'ward_placed':
          this.#ward_placed.push(event);
          break;
        case 'ward_killed':
          this.#ward_killed.push(event);
          break;
        case 'epic_monster_kill':
          this.#epic_monster_kill.push(event);
          break;
        case 'champion_kill':
          this.#champion_kill.push(event);
          break;
        case 'champion_kill_special':
          this.#champion_kill_special.push(event);
          break;
        case 'feat_updated':
          this.#feat_updated.push(event);
          break;
        case 'turret_plate_destroyed':
          this.#turret_plate_destroyed.push(event);
          break;
        case 'turret_plate_gold_earned':
          this.#turret_plate_gold_earned.push(event);
          break;
        case 'building_destroyed':
          this.#building_destroyed.push(event);
          break;
        case 'building_gold_grant':
          this.#building_gold_grant.push(event);
          break;
        case 'game_end':
          this.#game_end.push(event);
          break;
      }
    });
  }

  defineChampions(champions) {
    this.#champions = champions;
  }

  get version() {
    const version = this.#game_info.at(0).gameVersion;

    const filteredVersion = version.split('.').slice(0, 2).join('.');

    return filteredVersion;
  }

  definePatch(patch) {
    this.#patch = patch;
  }

  //API

  #findChampion(championName, { findByKey = false, key }) {
    //champ.key is a STRING!
    const curChampion = findByKey
      ? Object.values(this.#champions).find(
          (champ) => champ.key === String(key)
        )
      : this.#champions[championName];

    return {
      key: curChampion.key,
      name: curChampion.name,
      splashArt: `https://ddragon.leagueoflegends.com/cdn/${
        this.#patch
      }/img/champion/${curChampion.id}.png`,
    };
  }

  get participants() {
    const participantsData = this.#game_info.at(0).participants;

    const rawBlueSide = participantsData.slice(0, this.#TEAM_LENGTH);
    const rawRedSide = participantsData.slice(this.#TEAM_LENGTH);

    const blueSide = [];
    const redSide = [];

    const createParticipantData = (data, ind) => {
      return {
        puuid: data.puuid,
        lane: this.#lanes[ind],
        summonerName: data.summonerName,
        teamID: data.teamID,
        participantID: data.participantID,
        champion: this.#findChampion(data.championName, {
          findByKey: false,
          key: null,
        }),
      };
    };

    for (let ind = 0; ind < this.#TEAM_LENGTH; ind++) {
      blueSide.push(createParticipantData(rawBlueSide[ind], ind));
      redSide.push(createParticipantData(rawRedSide[ind], ind));
    }

    return {
      blueSide: blueSide,
      redSide: redSide,
      all: blueSide.concat(redSide),
    };
  }

  get game_settings() {
    const gameEndEvent = this.#game_end.at(0);

    return {
      winningTeam: gameEndEvent.winningTeam,
      date: this.#game_info.at(0).rfc460Timestamp,
      gameID: gameEndEvent.gameID,
      name: gameEndEvent.gameName,
      durationTimestamp: gameEndEvent.gameTime,
      duration: helpers.formatTimestamp(gameEndEvent.gameTime),
      patch: this.#patch,
    };
  }

  get wards() {
    return {
      placed: this.#ward_placed.map((event) => {
        return {
          timestamp: event.gameTime,
          formattedTimestamp: helpers.formatTimestamp(event.gameTime),
          wardType: event.wardType === 'unknown' ? 'zombie' : event.wardType,
          position: event.position,
          placerParticipantID: event.placer,
        };
      }),
      killed: this.#ward_killed.map((event) => {
        return {
          timestamp: event.gameTime,
          formattedTimestamp: helpers.formatTimestamp(event.gameTime),
          killerParticipantID: event.killer,
          position: event.position,
          wardType: event.wardType === 'unknown' ? 'zombie' : event.wardType,
        };
      }),
    };
  }

  get stats_update() {
    const stats = [];

    this.#stats_update.forEach((event) => {
      const formattedTimestamp = helpers.formatTimestamp(event.gameTime);

      if (!formattedTimestamp.endsWith('00')) return;

      const blueSide = event.participants
        .slice(0, this.#TEAM_LENGTH)
        .map(helpers.extractData);
      const redSide = event.participants
        .slice(this.#TEAM_LENGTH)
        .map(helpers.extractData);

      stats.push({
        timestamp: event.gameTime,
        formattedTimestamp: formattedTimestamp,
        blueSide: {
          individual: blueSide,
          team: event.teams.find((team) => team.teamID === this.#BLUE_SIDE_ID),
        },
        redSide: {
          individual: redSide,
          team: event.teams.find((team) => team.teamID === this.#RED_SIDE_ID),
        },
      });
    });

    return stats;
  }

  get feat_update() {
    const LOSE_STACK_NUM = 1001;
    const STACKS_TO_WIN = 2;
    const feats = [];
    const featsEnum = {
      firstBlood: {
        name: 'kFirstBlood',
        stacksToWin: 1,
      },
      firstTurret: {
        name: 'kFirstTurret',
        stacksToWin: 1,
      },
      epicKill: {
        name: 'kEpicKill',
        stacksToWin: 3,
      },
    };

    let blueSideScore = 0;
    let redSideScore = 0;

    const scoreTeam = (teamID) =>
      teamID === this.#BLUE_SIDE_ID
        ? (blueSideScore += 1)
        : (redSideScore += 1);

    this.#feat_updated.forEach((feat) => {
      if (feat.stacks === LOSE_STACK_NUM) return;

      switch (feat.featType) {
        case featsEnum.firstBlood.name:
          if (feat.stacks === featsEnum.firstBlood.stacksToWin)
            scoreTeam(feat.teamID);
          break;

        case featsEnum.epicKill.name:
          if (feat.stacks === featsEnum.epicKill.stacksToWin)
            scoreTeam(feat.teamID);
          break;

        case featsEnum.firstTurret.name:
          if (feat.stacks === featsEnum.firstTurret.stacksToWin)
            scoreTeam(feat.teamID);
          break;
      }

      feats.push({
        featType: feat.featType,
        timestamp: feat.gameTime,
        formattedTimestamp: helpers.formatTimestamp(feat.gameTime),
        stacks: feat.stacks,
        scorer_team: feat.teamID,
      });
    });

    let winner;

    if (blueSideScore === STACKS_TO_WIN) winner = 'blue';

    if (redSideScore === STACKS_TO_WIN) winner = 'red';

    return {
      feats: feats,
      winner: winner,
    };
  }

  get epic_kills() {
    const minorCampsEnum = [
      'gromp',
      'blueCamp',
      'wolf',
      'raptor',
      'redCamp',
      'krug',
    ];

    const epicsEnum = [
      'dragon',
      'riftHerald',
      'RuinousAtakhan',
      'VoraciousAtakhan',
      'baron',
      'VoidGrub',
    ];

    const minorCamps = [];
    const epics = [];

    this.#epic_monster_kill.forEach((killEvent) => {
      const epicKillData = {
        timestamp: killEvent.gameTime,
        formattedTimestamp: helpers.formatTimestamp(killEvent.gameTime),
        killerParticipantID: killEvent.killer,
        killerTeam: killEvent.killerTeamID,
        monsterType: killEvent.monsterType,
        position: killEvent.position,
      };

      if (minorCampsEnum.includes(killEvent.monsterType)) {
        epicKillData.inEnemyJungle = killEvent.inEnemyJungle;

        minorCamps.push(epicKillData);
      }

      if (epicsEnum.includes(killEvent.monsterType)) {
        if (killEvent.monsterType === 'dragon')
          epicKillData.dragonType = killEvent.dragonType;

        epicKillData.assistantsParticipantID = killEvent.assistants;
        epicKillData.killType = killEvent.killType;

        epics.push(epicKillData);
      }
    });

    return {
      minorCamps,
      epics,
    };
  }

  get champion_kills() {
    const championKills = {
      blueSide: [],
      redSide: [],
    };

    this.#champion_kill.forEach((event) => {
      const killData = {
        assistantsParticipantID: event.assistants,
        bounty: event.bounty,
        timestamp: event.gameTime,
        formattedTimestamp: helpers.formatTimestamp(event.gameTime),
        killerParticipantID: event.killer,
        killerTeamID: event.killerTeamID,
        position: event.position,
        victimParticipantID: event.victim,
        victimTeamID: event.victimTeamID,
      };

      if (event.killerTeamID === this.#BLUE_SIDE_ID)
        championKills.blueSide.push(killData);
      if (event.killerTeamID === this.#RED_SIDE_ID)
        championKills.redSide.push(killData);
    });

    return championKills;
  }

  get champion_select() {
    const selection = {
      bans: [],
      champSelection: {
        firstRotation: {
          blueSide: [],
          redSide: [],
        },
        secondRotation: {
          blueSide: [],
          redSide: [],
        },
      },
    };

    const FIRST_ROTATION_LAST_PICK_TURN = 6;

    const START_OF_SECOND_ROTATION_INDEX = 3;

    const postChampSelectEvent = this.#champ_select.find(
      (event) => event.gameState === 'POST_CHAMP_SELECT'
    );
    const champSelectEvents = this.#champ_select.filter(
      (event) => event.gameState === 'CHAMP_SELECT'
    );

    const lastFirstRotationPick = champSelectEvents
      .filter((event) => event.pickTurn === FIRST_ROTATION_LAST_PICK_TURN)
      .at(-1);

    const mapPickData = (player) => {
      return {
        puuid: player.puuid,
        pickTurn: player.pickTurn,
        champion: this.#findChampion(null, {
          findByKey: true,
          key: player.championID,
        }),
      };
    };

    selection.champSelection.firstRotation.blueSide =
      lastFirstRotationPick.teamOne
        .slice(0, START_OF_SECOND_ROTATION_INDEX)
        .map(mapPickData);

    selection.champSelection.firstRotation.redSide =
      lastFirstRotationPick.teamTwo
        .slice(0, START_OF_SECOND_ROTATION_INDEX)
        .map(mapPickData);

    selection.champSelection.secondRotation.blueSide =
      postChampSelectEvent.teamOne
        .slice(START_OF_SECOND_ROTATION_INDEX)
        .map(mapPickData);

    selection.champSelection.secondRotation.redSide =
      postChampSelectEvent.teamTwo
        .slice(START_OF_SECOND_ROTATION_INDEX)
        .map(mapPickData);

    selection.bans = postChampSelectEvent.bannedChampions.map((ban) => {
      return {
        champion: this.#findChampion(null, {
          findByKey: true,
          key: ban.championID,
        }),
        banTurn: ban.pickTurn,
        teamID: ban.teamID,
      };
    });

    return selection;
  }

  get bricks() {
    const bricks = {
      blueSide: [],
      redSide: [],
    };

    this.#turret_plate_destroyed.forEach((event) => {
      const destroyedData = {
        timestamp: event.gameTime,
        formattedTimestamp: helpers.formatTimestamp(event.gameTime),
        lane: event.lane,
        lastHitterParticipantID: event.lastHitter,
        belongsToTeamID: event.teamID,
      };

      if (event.teamID === this.#BLUE_SIDE_ID) {
        bricks.blueSide.push(destroyedData);
      }

      if (event.teamID === this.#RED_SIDE_ID) {
        bricks.redSide.push(destroyedData);
      }
    });

    return bricks;
  }

  get destroyed_buildings() {
    const destroyedBuildings = {
      blueSide: [],
      redSide: [],
    };

    this.#building_destroyed.forEach((event) => {
      const destroyedData = {
        assistantsParticipantID: event.assistants,
        buildingType: event.buildingType,
        timestamp: event.gameTime,
        formattedTimestamp: helpers.formatTimestamp(event.gameTime),
        lane: event.lane,
        lastHitterParticipantID: event.lastHitter,
        belongsToTeamID: event.teamID,
        turretTier: event.turretTier,
      };

      if (event.teamID === this.#BLUE_SIDE_ID) {
        destroyedBuildings.blueSide.push(destroyedData);
      }

      if (event.teamID === this.#RED_SIDE_ID) {
        destroyedBuildings.redSide.push(destroyedData);
      }
    });

    return destroyedBuildings;
  }
}

module.exports = MatchEvents;
