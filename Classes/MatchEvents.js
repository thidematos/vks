class MatchEvents {
  #rfcPropertyName = 'rfc461Schema';
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
        case 'ward_place':
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
    console.log(this.#patch);
  }

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

  getParticipants() {
    const TEAM_LENGTH = 5;
    const participantsData = this.game_info.at(0).participants;

    const rawBlueSide = participantsData.slice(0, TEAM_LENGTH);
    const rawRedSide = participantsData.slice(TEAM_LENGTH);

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

    for (let ind = 0; ind < TEAM_LENGTH; ind++) {
      blueSide.push(createParticipantData(rawBlueSide[ind], ind));
      redSide.push(createParticipantData(rawRedSide[ind], ind));
    }

    return {
      blueSide: blueSide,
      redSide: redSide,
      all: blueSide.concat(redSide),
    };
  }
}

module.exports = MatchEvents;
