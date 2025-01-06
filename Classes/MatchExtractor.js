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
  };

  plates = {
    destroyed: null,
    goldEarned: null,
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
    this.#getPlates();

    console.log(
      `Match started at: ${format(
        this.gameSettings.timestamp,
        "dd/MM/yyyy '---' hh:mm:ss"
      )}`
    );
  }

  #getPlates() {
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
            : this.#helper.participantIDToPlayer(event.lastHitter, [
                ...this.participants.teamOne.players,
                ...this.participants.teamTwo.players,
              ]),
        belongsToTeamID: event.teamID,
        gameTimestamp: event.gameTime,
        formattedTimestamp: format(event.gameTime, 'mm:ss'),
      };
    });

    const plagesGoldEarnedEvents = this.#eventsJsonl.filter(
      (event) =>
        event[this.#rfc.propertyName] === this.#rfc.types.turretPlateGoldEarned
    );
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
  'stats_update',
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
  'champion_kill',
  'champion_kill_special',
  'item_undo',
  'turret_plate_destroyed',
  'turret_plate_gold_earned',
  'building_gold_grant',
  'building_destroyed',
  'game_end'
*/
