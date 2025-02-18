const { format } = require('date-fns');
const helpers = require('./../utils/helpers');

class MatchEvents {
  #rfcPropertyName = 'rfc461Schema';
  #TEAM_LENGTH = 5;
  #BLUE_SIDE_ID = 100;
  #RED_SIDE_ID = 200;
  #champions = [];
  #patch;
  #lanes = ['top', 'jungle', 'mid', 'adc', 'supp'];

  game_info = [];
  champ_select = [];
  stats_update = [];
  ward_placed = [];
  epic_monster_kill = [];
  ward_killed = [];
  champion_kill = [];
  champion_kill_special = [];
  feat_updated = [];
  turret_plate_destroyed = [];
  turret_plate_gold_earned = [];
  building_destroyed = [];
  building_gold_grant = [];
  game_end = [];

  constructor(matchEvents) {
    this.#defineEvents(matchEvents);
  }

  //BASE DEFINIERS
  #defineEvents(matchEvents) {
    matchEvents.forEach((event) => {
      switch (event[this.#rfcPropertyName]) {
        case 'game_info':
          this.game_info.push(event);
          break;
        case 'champ_select':
          this.champ_select.push(event);
          break;
        case 'stats_update':
          this.stats_update.push(event);
          break;
        case 'ward_placed':
          this.ward_placed.push(event);
          break;
        case 'ward_killed':
          this.ward_killed.push(event);
          break;
        case 'epic_monster_kill':
          this.epic_monster_kill.push(event);
          break;
        case 'champion_kill':
          this.champion_kill.push(event);
          break;
        case 'champion_kill_special':
          this.champion_kill_special.push(event);
          break;
        case 'feat_updated':
          this.feat_updated.push(event);
          break;
        case 'turret_plate_destroyed':
          this.turret_plate_destroyed.push(event);
          break;
        case 'turret_plate_gold_earned':
          this.turret_plate_gold_earned.push(event);
          break;
        case 'building_destroyed':
          this.building_destroyed.push(event);
          break;
        case 'building_gold_grant':
          this.building_gold_grant.push(event);
          break;
        case 'game_end':
          this.game_end.push(event);
          break;
      }
    });
  }

  defineChampions(champions) {
    this.#champions = champions;
  }

  get version() {
    const version = this.game_info.at(0).gameVersion;

    const filteredVersion = version.split('.').slice(0, 2).join('.');

    return filteredVersion;
  }

  definePatch(patch) {
    this.#patch = patch;
  }

  //API

  #findChampion(championName) {
    const curChampion = this.#champions[championName];

    return {
      key: curChampion.key,
      name: curChampion.name,
      splashArt: `https://ddragon.leagueoflegends.com/cdn/${
        this.#patch
      }/img/champion/${curChampion.id}.png`,
    };
  }

  get participants() {
    const participantsData = this.game_info.at(0).participants;

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
        champion: this.#findChampion(data.championName),
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

  get gameSettings() {
    const gameEndEvent = this.game_end.at(0);

    return {
      winningTeam: gameEndEvent.winningTeam,
      date: this.game_info.at(0).rfc460Timestamp,
      gameID: gameEndEvent.gameID,
      name: gameEndEvent.gameName,
      durationTimestamp: gameEndEvent.gameTime,
      duration: format(gameEndEvent.gameTime, 'mm:ss'),
      patch: this.#patch,
    };
  }

  get wards() {
    return {
      placed: this.ward_placed.map((event) => {
        return {
          timestamp: event.gameTime,
          formattedTimestamp: format(event.gameTime, 'mm:ss'),
          wardType: event.wardType === 'unknown' ? 'zombie' : event.wardType,
          position: event.position,
          placerParticipantID: event.placer,
        };
      }),
      killed: this.ward_killed.map((event) => {
        return {
          timestamp: event.gameTime,
          formattedTimestamp: format(event.gameTime, 'mm:ss'),
          killerParticipantID: event.killer,
          position: event.position,
          wardType: event.wardType === 'unknown' ? 'zombie' : event.wardType,
        };
      }),
    };
  }

  get statsUpdate() {
    const stats = [];

    this.stats_update.forEach((event) => {
      const formattedTimestamp = format(event.gameTime, 'mm:ss');

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

  get featUpdate() {}
}

module.exports = MatchEvents;
