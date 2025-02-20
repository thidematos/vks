class Schemas {
  #timestamp = {
    formattedTimestamp: String,
    timestamp: Number,
  };

  #position = {
    x: Number,
    z: Number,
  };

  #champion = {
    key: String,
    name: String,
    splashArt: String,
  };

  #individual_stats = {
    gold: Number,
    level: Number,
    participantID: Number,
    position: this.#position,
    puuid: String,
    xp: Number,
    stats: {
      assists: Number,
      champions_killed: Number,
      magic_damage_dealt_to_champions: Number,
      minions_killed: Number,
      neutral_minions_killed: Number,
      neutral_minions_killed_enemy_jungle: Number,
      neutral_minions_killed_your_jungle: Number,
      num_deaths: Number,
      physical_damage_dealt_to_champions: Number,
      total_damage_dealt_to_champions: Number,
      true_damage_dealt_to_champions: Number,
      vision_score: Number,
      ward_killed: Number,
      ward_placed: Number,
    },
  };

  #stats_per_team = {
    individual: [this.#individual_stats],
    team: {
      assists: Number,
      baronKills: Number,
      championsKills: Number,
      deaths: Number,
      dragonKills: Number,
      inhibKills: Number,
      teamID: Number,
      totalGold: Number,
      towerKills: Number,
    },
  };

  stats = {
    ...this.#timestamp,
    blueSide: this.#stats_per_team,
    redSide: this.#stats_per_team,
  };

  wards = {
    killed: {
      ...this.#timestamp,
      killerParticipantID: Number,
      position: this.#position,
      wardType: String,
    },
    placed: {
      ...this.#timestamp,
      placerParticipantID: Number,
      position: this.#position,
      wardType: String,
    },
  };

  game_settings = {
    date: String,
    duration: String,
    durationTimestamp: String,
    gameID: Number,
    name: String,
    patch: String,
    winningTeam: Number,
  };

  player = {
    champion: this.#champion,
    lane: String,
    participantID: Number,
    puuid: String,
    summonerName: String,
    teamID: Number,
  };

  brick = {
    ...this.#timestamp,
    belongstoTeamID: Number,
    lane: String,
    lastHitterParticipantID: Number,
  };

  epic_kills = {
    epics: {
      ...this.#timestamp,
      assistantsParticipantID: [],
      killType: String,
      killerParticipantID: Number,
      killerTeam: Number,
      monsterType: String,
      position: this.#position,
      dragonType: String,
    },
    minorCamps: {
      ...this.#timestamp,
      inEnemyJungle: Boolean,
      killerParticipantID: Number,
      killerTeam: Number,
      monsterType: String,
      position: this.#position,
    },
  };

  feats = {
    ...this.#timestamp,
    featType: String,
    scorer_team: Number,
    stacks: Number,
  };

  destroyed_building = {
    ...this.brick,
    assistantsParticipantID: [Number],
    buildingType: String,
    turretTier: String,
  };

  pick = {
    champion: this.#champion,
    pickTurn: Number,
    puuid: String,
  };

  champion_kills = {
    ...this.#timestamp,
    assistantsParticipantID: [Number],
    bounty: Number,
    killerParticipantID: Number,
    killerTeamID: Number,
    position: this.#position,
    victimParticipantID: Number,
    victimTeamID: Number,
  };

  bans = {
    banTurn: Number,
    champion: this.#champion,
    teamID: Number,
  };

  constructor() {}
}

module.exports = Schemas;
