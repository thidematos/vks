const { format } = require('date-fns');

class Analytics {
  dragonStats = {
    firstDragonTimestamp: 0,
  };

  constructor(events) {
    this.events = events;
  }

  getDragonStats() {
    const dragonKillsEvents = this.events.eliteMonsterKill.list.filter(
      (event) => event.monsterType === 'DRAGON'
    );

    this.#getFirstDragonTimestamp(dragonKillsEvents);

    return this.dragonStats.firstDragonTimestamp;
  }

  #getFirstDragonTimestamp(events) {
    let firstDragonKill = events.at(0);
    events.forEach((e) => {
      if (Number(e.timestamp) < Number(firstDragonKill.timestamp)) {
        firstDragonKill = e;
      }
    });

    this.dragonStats.firstDragonTimestamp = firstDragonKill;
  }
}

module.exports = Analytics;
