class MatchDetails {
  MatchEvents = null;

  participants = [];
  gameSettings = null;
  wards = null;
  stats = null;

  constructor(MatchEvents) {
    this.MatchEvents = MatchEvents;
  }

  defineData() {
    this.#defineParticipants();
    this.#defineGameSettings();
    this.#defineWards();
    this.#defineStats();
    this.#defineFeatUpdate();
  }

  #defineParticipants() {
    this.participants = this.MatchEvents.participants;
  }

  #defineGameSettings() {
    this.gameSettings = this.MatchEvents.gameSettings;
  }

  #defineWards() {
    this.wards = this.MatchEvents.wards;
  }

  #defineStats() {
    this.stats = this.MatchEvents.statsUpdate;
  }

  #defineFeatUpdate() {
    this.featUpdate = this.MatchEvents.featUpdate;
  }
}

module.exports = MatchDetails;
