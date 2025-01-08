const Parser = require('./Parser');
const MatchHelpers = require('./MatchHelpers');
const { format } = require('date-fns');

const parser = new Parser();

class MatchExtractor {
  #champions;

  #helper;

  #eventsJsonl;

  #endDetailsJson;

  #gameStages = {
    preChampSelect: 'PRE_CHAMP_SELECT',
    postChampSelect: 'POST_CHAMP_SELECT',
    champSelect: 'CHAMP_SELECT',
  };

  #rfc = {
    timestampPropertyName: 'rfc460Timestamp',
    propertyName: 'rfc461Schema',
    types: {
      pauseEnded: 'pause_ended',
      gameInfo: 'game_info',
      turretPlateDestroyed: 'turret_plate_destroyed',
      turretPlateGoldEarned: 'turret_plate_gold_earned',
      wardPlaced: 'ward_placed',
      wardKilled: 'ward_killed',
      epicMonsterKill: 'epic_monster_kill',
      buildingDestroyed: 'building_destroyed',
      buildingGoldGrant: 'building_gold_grant',
      statsUpdate: 'stats_update',
    },
  };

  picks = {
    firstRotation: null,
    secondRotation: null,
  };

  bans = {
    firstRotation: null,
    secondRotation: null,
  };

  participants = {
    teamOne: {
      team: null,
      players: null,
      teamNum: 100,
    },
    teamTwo: {
      team: null,
      players: null,
      teamNum: 200,
    },
    allPlayers: null,
  };

  plates = {
    destroyed: null,
    goldEarned: null,
  };

  wards = {
    placed: null,
    killed: null,
  };

  jungleMonstersKills = {
    minorCamps: {
      krug: null,
      raptor: null,
      gromp: null,
      wolf: null,
    },
    buffCamps: {
      blueCamp: null,
      redCamp: null,
    },
    scuttleCrab: null,
    voidGrubs: null,
    riftHerald: null,
    baron: null,
    dragon: null,
  };

  buildingsDestroyed = {
    turret: null,
    inhibitor: null,
    nexus: null,
  };

  splitScores = {
    teamOne: null,
    teamTwo: null,
  };

  positions = {
    teamOne: null,
    teamTwo: null,
  };

  gold = {
    at10: {
      teamOne: null,
      teamTwo: null,
    },
    at15: {
      teamOne: null,
      teamTwo: null,
    },
    at20: {
      teamOne: null,
      teamTwo: null,
    },
    at25: {
      teamOne: null,
      teamTwo: null,
    },
  };

  criticalTimes = {
    at10: { teamOne: null, teamTwo: null },
    at15: { teamOne: null, teamTwo: null },
    at20: { teamOne: null, teamTwo: null },
    at25: { teamOne: null, teamTwo: null },
  };

  atTimeDiffs = {
    at10: null,
    at15: null,
    at20: null,
    at25: null,
  };

  perMinuteStats = {
    teamOne: null,
    teamTwo: null,
  };

  gameSettings = {
    gameID: null,
    timestamp: null,
    name: null,
    patch: null,
  };

  constructor({ stringJson, stringJsonl, champions }) {
    this.#eventsJsonl = parser.jsonl(stringJsonl);
    this.#endDetailsJson = parser.json(stringJson);
    this.#champions = champions;
    this.#setSettings();
  }

  #setSettings() {
    this.#helper = new MatchHelpers(this.#champions);

    const firstEvent = this.#eventsJsonl.at(0);

    //Settings
    this.gameSettings.gameID = firstEvent.gameID;
    this.gameSettings.name = firstEvent.name;
    this.gameSettings.timestamp = this.#getStartTimestamp();
    this.gameSettings.patch = this.#getPatch();

    //Game Info
    this.#getParticipants();
    this.#getBanList();
    this.#getPicks();
    this.#getPlatesDestroyed();
    this.#getPlatesGoldEarned();
    this.#getWardsPlaced();
    this.#getWardsKilled();
    this.#getEpicKills();
    this.#getBuildingsDestroyed();
    this.#getSplitScore();
    this.#getMapPositions();
    this.#getGoldAtTime();
    this.#getCriticalTimeStates();
    this.#getStatsPerMinute();

    console.log(
      `Match started at: ${format(
        this.gameSettings.timestamp,
        "dd/MM/yyyy '---' hh:mm:ss"
      )}`
    );
  }

  #getCriticalTimeStates() {
    const timesStr = this.#helper.criticalTimes;

    const stateEvents = this.#eventsJsonl.filter(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.statsUpdate
    );

    timesStr.forEach((time) => {
      const propertyName = `at${time.slice(0, 2)}`;

      const curScreenshot = stateEvents.find(
        (state) => format(state.gameTime, 'mm:ss') === time
      );

      const teamOne = curScreenshot.participants.filter(
        (participant) =>
          participant.teamID === this.participants.teamOne.teamNum
      );
      const teamTwo = curScreenshot.participants.filter(
        (participant) =>
          participant.teamID === this.participants.teamTwo.teamNum
      );

      this.criticalTimes[propertyName] = {
        teamOne: this.#helper.getTeamStatesAtTime(
          curScreenshot,
          teamOne,
          this.participants.teamOne.teamNum
        ),
        teamTwo: this.#helper.getTeamStatesAtTime(
          curScreenshot,
          teamTwo,
          this.participants.teamTwo.teamNum
        ),
      };
    });

    this.#getAtTimeDiffs();
  }

  #getAtTimeDiffs() {
    //gold, xp, cs, kills, assists, deaths
    this.#helper.criticalTimes.forEach((time) => {
      const timeStr = `at${time.slice(0, 2)}`;
      const currentTimeIteration = this.criticalTimes[timeStr];
      //goldDiff
      currentTimeIteration.goldDiff =
        this.#helper.getGoldDiff(currentTimeIteration);

      currentTimeIteration.xpDiff =
        this.#helper.getXpDiff(currentTimeIteration);

      currentTimeIteration.csDiff =
        this.#helper.getCsDiff(currentTimeIteration);

      currentTimeIteration.takedownsDiff =
        this.#helper.getTakedownsDiff(currentTimeIteration);
    });
  }

  #getGoldAtTime() {
    const [teamOneStatesEvents, teamTwoStatesEvents] =
      this.#creteStateEventsForEachTeam();

    const timesStr = this.#helper.criticalTimes;

    timesStr.forEach((str) => {
      this.gold[`at${str.slice(0, 2)}`].teamOne = this.#helper.getGoldAtTime(
        teamOneStatesEvents,
        str
      );

      this.gold[`at${str.slice(0, 2)}`].teamTwo = this.#helper.getGoldAtTime(
        teamTwoStatesEvents,
        str
      );
    });
  }

  #getStatsPerMinute() {
    const [teamOneStatesEvents, teamTwoStatesEvents] =
      this.#creteStateEventsForEachTeam();

    const filterFullMinutes = (events) =>
      events.filter((event) => event.formattedTimestamp.endsWith('00'));

    const teamOneMinuteEvents = filterFullMinutes(teamOneStatesEvents);
    const teamTwoMinuteEvents = filterFullMinutes(teamTwoStatesEvents);

    this.perMinuteStats.teamOne =
      this.#helper.getPerMinuteStats(teamOneMinuteEvents);
    this.perMinuteStats.teamTwo =
      this.#helper.getPerMinuteStats(teamTwoMinuteEvents);
  }

  #creteStateEventsForEachTeam() {
    const gameStatesEvents = this.#eventsJsonl.filter(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.statsUpdate
    );

    const teamOneStatesEvents = this.#helper.getStateOfEachTeam(
      gameStatesEvents,
      this.participants.teamOne.teamNum
    );

    const teamTwoStatesEvents = this.#helper.getStateOfEachTeam(
      gameStatesEvents,
      this.participants.teamTwo.teamNum
    );

    return [teamOneStatesEvents, teamTwoStatesEvents];
  }

  #getMapPositions() {
    const [teamOneStatesEvents, teamTwoStatesEvents] =
      this.#creteStateEventsForEachTeam();

    const teamOnePositions = this.#helper.getPositions(teamOneStatesEvents);

    const teamTwoPosition = this.#helper.getPositions(teamTwoStatesEvents);

    this.positions.teamOne = teamOnePositions;
    this.positions.teamTwo = teamTwoPosition;
  }

  #getSplitScore() {
    const [teamOneStatesEvents, teamTwoStatesEvents] =
      this.#creteStateEventsForEachTeam();

    const teamOneStatesInterval = this.#helper.getStateInterval(
      teamOneStatesEvents,
      this.#helper.splitScoreInterval.start,
      this.#helper.splitScoreInterval.end
    );
    const teamTwoStatesInterval = this.#helper.getStateInterval(
      teamTwoStatesEvents,
      this.#helper.splitScoreInterval.start,
      this.#helper.splitScoreInterval.end
    );

    const teamOnePuuids = this.participants.teamOne.players.map(
      (player) => player.puuid
    );

    const teamTwoPuuids = this.participants.teamTwo.players.map(
      (player) => player.puuid
    );

    const teamOneSplitScores = this.#helper.calculateSplitScores(
      teamOnePuuids,
      teamOneStatesInterval
    );

    const teamTwoSplitScores = this.#helper.calculateSplitScores(
      teamTwoPuuids,
      teamTwoStatesInterval
    );

    this.splitScores.teamOne = teamOneSplitScores;
    this.splitScores.teamTwo = teamTwoSplitScores;
  }

  #getBuildingsDestroyed() {
    //Important properties: assistants, bountyGold, buildingType, gameTime, lane, lastHitter, teamID, turretTier
    //inhibitor não tem bounty/turretTier
    //nexus não tem bountyGold/turretTier/lane
    const buildingEvents = this.#eventsJsonl.filter(
      (event) =>
        event[this.#rfc.propertyName] === this.#rfc.types.buildingDestroyed
    );

    this.#helper.buildingTypes.forEach((buildingType) => {
      this.#createBuildingsData(buildingEvents, buildingType);
    });
  }

  #createBuildingsData(buildingEvents, buildingType) {
    const curBuildingEvents = buildingEvents.filter(
      (event) => event.buildingType === buildingType
    );

    const curBuildingData = curBuildingEvents.map((event) => {
      const data = {
        assistants: event.assistants.map((assistant) =>
          this.#helper.participantIDToPlayer(
            assistant,
            this.participants.allPlayers
          )
        ),
        buildingType: event.buildType,
        gameTimestamp: event.gameTime,
        formattedTimestamp: this.#helper.formatGameTimestamp(event.gameTime),
        lastHitter: this.#helper.participantIDToPlayer(
          event.lastHitter,
          this.participants.allPlayers
        ),
        belongsToTeamID: event.teamID,
      };

      if (buildingType === 'turret') {
        data.turretTier = event.turretTier;
        data.lane = event.lane;
        data.bountyGold = event.bountyGold;
      }

      if (buildingType === 'inhibitor') data.lane = event.lane;

      return data;
    });

    this.buildingsDestroyed[buildingType] = curBuildingData;
  }

  #getEpicKills() {
    const epicKillsEvents = this.#eventsJsonl.filter(
      (event) =>
        event[this.#rfc.propertyName] === this.#rfc.types.epicMonsterKill
    );

    this.#helper.jungleCamps.forEach((minorCamp) => {
      this.#createJungleCampsData(epicKillsEvents, minorCamp);
    });
  }

  #createJungleCampsData(epicKillsEvents, monsterType) {
    //Important properties: assistants, bountyGold, gameTime, globalGold, inEnemyJungle, killType, killer, killerGold, killerTeamID, localGold, monsterType,
    const jungleEvents = epicKillsEvents.filter(
      (event) => event.monsterType === monsterType
    );

    const mappedEvent = jungleEvents.map((event) => {
      const jungleData = {
        assistants: event.assistants.map((assistant) =>
          this.#helper.participantIDToPlayer(
            assistant,
            this.participants.allPlayers
          )
        ),
        bountyGold: event.bountyGold,
        gameTimestamp: event.gameTime,
        formattedTimestamp: this.#helper.formatGameTimestamp(event.gameTime),
        globalGold: event.globalGold,
        inEnemyJungle: event.inEnemyJungle,
        killType: event.killType,
        killer: this.#helper.participantIDToPlayer(
          event.killer,
          this.participants.allPlayers
        ),
        killerGold: event.killerGold,
        killerTeamID: event.killerTeamID,
        localGold: event.localGold,
        monsterType: event.monsterType,
      };

      if (monsterType === 'dragon') {
        jungleData.dragonType = event.dragonType;
      }

      return jungleData;
    });

    switch (monsterType) {
      case 'blueCamp':
        this.jungleMonstersKills.buffCamps[monsterType] = mappedEvent;
        return;

      case 'redCamp':
        this.jungleMonstersKills.buffCamps[monsterType] = mappedEvent;
        return;

      case 'scuttleCrab':
        this.jungleMonstersKills.scuttleCrab = mappedEvent;
        return;

      case 'VoidGrub':
        this.jungleMonstersKills.voidGrubs = mappedEvent;
        return;

      case 'riftHerald':
        this.jungleMonstersKills.riftHerald = mappedEvent;
        return;

      case 'baron':
        this.jungleMonstersKills.baron = mappedEvent;
        return;

      case 'dragon':
        this.jungleMonstersKills.dragon = mappedEvent;
        return;

      default:
        this.jungleMonstersKills.minorCamps[monsterType] = mappedEvent;
        return;
    }
  }

  #getWardsPlaced() {
    //Important properties: gameTime, placer, position, wardType
    const wardsPlacedEvents = this.#eventsJsonl.filter(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.wardPlaced
    );

    this.wards.placed = wardsPlacedEvents.map((event) => {
      return {
        gameTimestamp: event.gameTime,
        formattedTimestamp: this.#helper.formatGameTimestamp(event.gameTime),
        placer: this.#helper.participantIDToPlayer(
          event.placer,
          this.participants.allPlayers
        ),
        position: event.position,
        wardType: event.wardType === 'unknown' ? 'zombieWard' : event.wardType,
      };
    });
  }

  #getWardsKilled() {
    //Important properties: gameTime, killer, position, wardType
    const wardsKilledEvents = this.#eventsJsonl.filter(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.wardKilled
    );

    this.wards.killed = wardsKilledEvents.map((event) => {
      return {
        gameTimestamp: event.gameTime,
        formattedTimestamp: this.#helper.formatGameTimestamp(event.gameTime),
        killer: this.#helper.participantIDToPlayer(
          event.killer,
          this.participants.allPlayers
        ),
        position: event.position,
        wardType: event.wardType === 'unknown' ? 'zombieWard' : event.wardType,
      };
    });
  }

  #getPlatesDestroyed() {
    //Important properties: assistants, lane, lastHitter, teamID, gameTime
    const platesDestroyedEvents = this.#eventsJsonl.filter(
      (event) =>
        event[this.#rfc.propertyName] === this.#rfc.types.turretPlateDestroyed
    );

    this.plates.destroyed = platesDestroyedEvents.map((event) => {
      return {
        assistants: event.assistants,
        lane: event.lane,
        lastHitter:
          event.lastHitter === 0
            ? 'minion'
            : this.#helper.participantIDToPlayer(
                event.lastHitter,
                this.participants.allPlayers
              ),
        belongsToTeamID: event.teamID,
        gameTimestamp: event.gameTime,
        formattedTimestamp: format(event.gameTime, 'mm:ss'),
      };
    });
  }

  #getPlatesGoldEarned() {
    //Important properties: bounty, gameTime, participantID, teamID (who destroyed)

    const platesGoldEarnedEvents = this.#eventsJsonl.filter(
      (event) =>
        event[this.#rfc.propertyName] === this.#rfc.types.turretPlateGoldEarned
    );

    this.plates.goldEarned = platesGoldEarnedEvents.map((event) => {
      return {
        goldBounty: event.bounty,
        gameTimestamp: event.gameTime,
        formattedTimestamp: format(event.gameTime, 'mm:ss'),
        earner: this.#helper.participantIDToPlayer(
          event.participantID,
          this.participants.allPlayers
        ),
        teamIDWhoDestroyed: event.teamID,
      };
    });
  }

  #getPatch() {
    const patch = this.#eventsJsonl.find(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.gameInfo
    ).gameVersion;

    console.log(patch);

    return patch;
  }

  #getStartTimestamp() {
    const timestamp = this.#eventsJsonl.find(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.pauseEnded
    )[this.#rfc.timestampPropertyName];

    return timestamp;
  }

  #getParticipants() {
    const firstEvent = this.#eventsJsonl.at(0);
    const gameInfoParticipants = this.#eventsJsonl.find(
      (event) => event[this.#rfc.propertyName] === this.#rfc.types.gameInfo
    ).participants;

    this.participants.teamOne.team = this.#helper.getTeamInitials(
      firstEvent.teamOne
    );
    this.participants.teamTwo.team = this.#helper.getTeamInitials(
      firstEvent.teamTwo
    );

    this.participants.teamOne.players = this.#helper.getTeamPlayers(
      firstEvent.teamOne,
      gameInfoParticipants
    );
    this.participants.teamTwo.players = this.#helper.getTeamPlayers(
      firstEvent.teamTwo,
      gameInfoParticipants
    );

    this.participants.allPlayers = [
      ...this.participants.teamOne.players,
      ...this.participants.teamTwo.players,
    ];
  }

  #getBanList() {
    const preChampSelect = this.#eventsJsonl
      .filter((event) => event.gameState === this.#gameStages.postChampSelect)
      .at(0);

    const firstRotation = preChampSelect.bannedChampions.slice(0, 6);

    const secondRotation = preChampSelect.bannedChampions.slice(6);

    firstRotation.forEach((ban) => {
      ban.championInfo = this.#helper.iterateBans(ban);
    });

    secondRotation.forEach((ban) => {
      ban.championInfo = this.#helper.iterateBans(ban);
    });

    this.bans.firstRotation = firstRotation;
    this.bans.secondRotation = secondRotation;
  }

  #getPicks() {
    const champSelectEvents = this.#eventsJsonl.filter(
      (event) => event.gameState === this.#gameStages.champSelect
    );

    const firstRotation = champSelectEvents
      .filter((event) => event.pickTurn === this.#helper.firstRotationTurns)
      .at(-1);

    const { sequenceIndex: firstRotationSequenceIndex } = firstRotation;

    const secondRotation = champSelectEvents
      .filter(
        (event) =>
          event.pickTurn === this.#helper.secondRotationTurns &&
          event.sequenceIndex > firstRotationSequenceIndex
      )
      .at(-1);

    this.picks.firstRotation = this.#helper.getRotationPicks(firstRotation);
    this.picks.secondRotation = this.#helper.getRotationPicks(secondRotation);
  }
}

module.exports = MatchExtractor;

/*
   'champ_select',
  'game_info',
  'queued_epic_monster_info',
  'reconnect',
  'pause_ended',
  'queued_dragon_info',
  'stats_update', **************
  'item_purchased',
  'skill_level_up',
  'skill_used',
  'ward_placed',
  'item_active_ability_used',
  'channeling_started',
  'channeling_ended',
  'item_destroyed',
  'neutral_minion_spawn',
  'epic_monster_kill',
  'champion_level_up',
  'summoner_spell_used',
  'ward_killed',
  'item_sold',
  'epic_monster_spawn',
  'champion_kill', **************
  'champion_kill_special',
  'item_undo',
  'turret_plate_destroyed',
  'turret_plate_gold_earned',
  'building_gold_grant',
  'building_destroyed',
  'game_end'
*/
