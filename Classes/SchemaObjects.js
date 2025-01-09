class SchemaObjects {
  #championInfo = {
    key: Number,
    name: String,
    splash: String,
  };

  completePlayerInfo = {
    participantID: Number,
    puuid: String,
    summonerName: String,
  };

  #position = {
    x: Number,
    z: Number,
  };

  #teamPicks = [
    {
      championInfo: this.#championInfo,
      pickTurn: Number,
      player: {
        summonerName: String,
        puuid: String,
      },
    },
  ];

  #wardsDefault = {
    formattedTimestamp: String,
    gameTimestamp: Number,
    position: this.#position,
    wardType: String,
  };

  #teamGold = {
    formattedTimestamp: String,
    gameTimestamp: Number,
    players: [
      {
        puuid: String,
        totalGold: Number,
      },
    ],
    totalTeamGold: Number,
  };

  #csXpGoldDiff = {
    diff: Number,
    teamOne: Number,
    teamTwo: Number,
    winningTeamID: Number,
  };

  #takedownDiff = {
    diff: Number,
    winningTeamID: Number,
  };

  #teamDiffsCriticalTimes = {
    formattedTimestamp: String,
    gameTimestamp: Number,
    teamParticipants: [
      {
        assists: Number,
        championsKilled: Number,
        level: Number,
        minionsKilled: Number,
        neutralMinionsKilled: Number,
        neutralMinionsKilledEnemyJungle: Number,
        neutralMinionsKilledYourJungle: Number,
        numDeaths: Number,
        puuid: String,
        teamID: Number,
        totalDamageDealtToChampions: Number,
        totalGold: Number,
        visionScore: Number,
        wardKilled: Number,
        wardPlaced: Number,
        xp: Number,
      },
    ],
    totals: {
      assists: Number,
      baronKills: Number,
      championsKills: Number,
      deaths: Number,
      dragonKills: Number,
      inhibKills: Number,
      totalGold: Number,
      towerKills: Number,
    },
  };

  #teamTotalsCriticalTimes = {
    assists: Number,
    deaths: Number,
    kills: Number,
  };

  #defaultBuildings = {
    assistants: [this.completePlayerInfo],
    belongsToTeamID: Number,
    formattedTimestamp: String,
    gameTimestamp: Number,
    lastHitter: this.completePlayerInfo,
  };

  perMinuteStats = [
    {
      formattedTimestamp: String,
      gameTimestamp: Number,
      players: [
        {
          level: Number,
          puuid: String,
          xp: Number,
          stats: {
            assists: Number,
            championsKilled: Number,
            minionsKilled: Number,
            neutralMinionsKilled: Number,
            neutralMinionsKilledEnemyJungle: Number,
            neutralMinionsKilledYourJungle: Number,
            numDeaths: Number,
            totalDamageDealtToChampions: Number,
            visionScore: Number,
            wardKilled: Number,
            wardPlaced: Number,
          },
        },
      ],
    },
  ];

  #monsterData = {
    assistants: [this.completePlayerInfo],
    bountyGold: Number,
    formattedTimestamp: String,
    gameTimestamp: Number,
    globalGold: Number,
    inEnemyJungle: Boolean,
    killType: String,
    killer: this.completePlayerInfo,
    killerGold: Number,
    killerTeamID: Number,
    localGold: Number,
    monsterType: String,
  };

  criticalTimes = {
    time: {
      csDiff: this.#csXpGoldDiff,
      goldDiff: this.#csXpGoldDiff,
      xpDiff: this.#csXpGoldDiff,
      takedownsDiff: {
        diff: {
          assists: this.#takedownDiff,
          deaths: this.#takedownDiff,
          kills: this.#takedownDiff,
        },
        teamOne: this.#teamTotalsCriticalTimes,
        teamTwo: this.#teamTotalsCriticalTimes,
      },
      teamOne: this.#teamDiffsCriticalTimes,
      teamTwo: this.#teamDiffsCriticalTimes,
    },
  };

  buildingsDestroyed = {
    inhibitor: {
      ...this.#defaultBuildings,
      lane: String,
    },
    nexus: this.#defaultBuildings,
    turret: {
      ...this.#defaultBuildings,
      bountyGold: Number,
      lane: String,
      turretTier: String,
    },
  };

  splitScore = {
    score: {
      puuid: String,
      splitScoreData: [
        {
          formattedTimestamp: String,
          splitScore: Number,
        },
      ],
    },
  };

  bans = {
    rotation: {
      championID: Number,
      championInfo: this.#championInfo,
      pickTurn: Number,
      teamID: Number,
    },
  };

  goldAtTime = {
    teamOne: this.#teamGold,
    teamTwo: this.#teamGold,
  };

  participants = {
    team: {
      team: String,
      teamNum: Number,
      players: [this.completePlayerInfo],
    },
  };

  jungleMonstersKills = {
    monsterData: this.#monsterData,
    dragonData: {
      ...this.#monsterData,
      dragonType: String,
    },
  };

  wards = {
    killed: [
      {
        ...this.#wardsDefault,
        killer: this.completePlayerInfo,
      },
    ],
    placed: [
      {
        ...this.#wardsDefault,
        placer: this.completePlayerInfo,
      },
    ],
  };

  positions = {
    team: [
      {
        formattedTimestamp: String,
        gameTimestamp: Number,
        players: [
          {
            position: this.#position,
            puuid: String,
          },
        ],
      },
    ],
  };

  picks = {
    rotation: {
      teamOne: this.#teamPicks,
      teamTwo: this.#teamPicks,
    },
  };

  constructor() {}
}

module.exports = SchemaObjects;
