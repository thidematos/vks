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

    console.log(this.dragonStats.firstDragonTimestamp);
  }

  #getFirstDragonTimestamp(events) {
    let firstDragonKill = events.at(0);
    events.forEach((e) => {
      console.log(format(e.timestamp, "mm:ss 'min'"));
      if (Number(e.timestamp) < Number(firstDragonKill.timestamp)) {
        firstDragonKill = e;
      }
    });

    this.dragonStats.firstDragonTimestamp = firstDragonKill;
  }
}

module.exports = Analytics;
