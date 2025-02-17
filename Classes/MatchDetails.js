class MatchDetails {
  #MatchEvents = null;

  participants = [];

  constructor(MatchEvents) {
    this.#MatchEvents = MatchEvents;
  }

  defineData() {
    this.#defineParticipants();
  }

  #defineParticipants() {
    this.participants = this.#MatchEvents.getParticipants();
  }
}

module.exports = MatchDetails;
