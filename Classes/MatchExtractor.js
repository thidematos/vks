const eventIterator = require('../utils/eventIterator');
const Analytics = require('./Analytics');
const InGameFrame = require('./InGameFrame');
const Participant = require('./Participant');

class MatchExtractor {
  #events = {
    turretPlateDestroyed: { key: 'TURRET_PLATE_DESTROYED', list: [] },
    buildingDestroyed: { key: 'BUILDING_KILL', list: [] },
    wardPlaced: { key: 'WARD_PLACED', list: [] },
    wardKill: { key: 'WARD_KILL', list: [] },
    eliteMonsterKill: { key: 'ELITE_MONSTER_KILL', list: [] },
    levelUp: { key: 'LEVEL_UP', list: [] },
    championKill: { key: 'CHAMPION_KILL', list: [] },
  };

  constructor(match) {
    this.match = match;
    this.participants = match.participants.map(
      (participant) => new Participant(participant)
    );
    this.frames = match.frames;
    this.gameId = match.gameId;
    this.timestamp = match.frames.at(0).events.at(0).realTimestamp;
  }

  getEvents() {
    this.#getPlateDestructionEvents()
      .#getTurretKill()
      .#getWardPlaced()
      .#getWardKill()
      .#getEliteMonsterKill()
      .#getLevelUp()
      .#getChampionKill()
      .#getAnalytics();

    return this;
  }

  #getAnalytics() {
    const analyticsAPI = new Analytics(this.#events);

    analyticsAPI.getDragonStats();
  }

  #getPlateDestructionEvents() {
    this.#events.turretPlateDestroyed.list = eventIterator(
      this.frames,
      this.#events.turretPlateDestroyed.key
    );

    return this;
  }

  #getTurretKill() {
    this.#events.buildingDestroyed.list = eventIterator(
      this.frames,
      this.#events.buildingDestroyed.key
    );

    return this;
  }

  #getWardPlaced() {
    this.#events.wardPlaced.list = eventIterator(
      this.frames,
      this.#events.wardPlaced.key
    );

    return this;
  }

  #getWardKill() {
    this.#events.wardKill.list = eventIterator(
      this.frames,
      this.#events.wardKill.key
    );

    return this;
  }

  #getEliteMonsterKill() {
    this.#events.eliteMonsterKill.list = eventIterator(
      this.frames,
      this.#events.eliteMonsterKill.key
    );

    return this;
  }

  #getLevelUp() {
    this.#events.levelUp.list = eventIterator(
      this.frames,
      this.#events.levelUp.key
    );

    return this;
  }

  #getChampionKill() {
    this.#events.championKill.list = eventIterator(
      this.frames,
      this.#events.championKill.key
    );

    return this;
  }

  defineParticipantsFrames() {
    this.frames.forEach((frame) => {
      this.participants.forEach((participant) => {
        const currentFrame = new InGameFrame(frame.timestamp);
        currentFrame.defineStats(
          frame.participantFrames[String(participant.participantId)]
        );
        participant.defineFrames(currentFrame);
      });
    });

    return this;
  }
}

module.exports = MatchExtractor;

/*
  'PAUSE_END', -----
  'ITEM_PURCHASED', -----
  'SKILL_LEVEL_UP', -----
  'WARD_PLACED', !!!
  'ITEM_DESTROYED', -----
  'LEVEL_UP', !!! 
  'WARD_KILL', !!!
  'ITEM_SOLD', ------
  'ELITE_MONSTER_KILL', !!!
  'CHAMPION_KILL', !!!
  'CHAMPION_SPECIAL_KILL', -----
  'ITEM_UNDO', ----
  'TURRET_PLATE_DESTROYED', !!!
  'BUILDING_KILL', !!!
  'GAME_END' ------
*/
