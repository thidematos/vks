class MatchDetails {
  MatchEvents = null;

  participants = [];
  game_settings = null;
  wards = null;
  stats = null;
  feat_update = null;
  epic_kills = null;
  champion_kills = null;
  champion_select = null;
  bricks = null;
  destroyed_buildings = null;

  constructor(MatchEvents) {
    this.MatchEvents = MatchEvents;
  }

  defineData() {
    this.#defineParticipants();
    this.#defineGameSettings();
    this.#defineWards();
    this.#defineStats();
    this.#defineFeatUpdate();
    this.#defineEpicKills();
    this.#defineChampionKills();
    this.#defineChampSelect();
    this.#defineBricks();
    this.#defineDestroyedBuildings();
  }

  #defineParticipants() {
    this.participants = this.MatchEvents.participants;
  }

  #defineGameSettings() {
    this.game_settings = this.MatchEvents.game_settings;
  }

  #defineWards() {
    this.wards = this.MatchEvents.wards;
  }

  #defineStats() {
    this.stats = this.MatchEvents.stats_update;
  }

  #defineFeatUpdate() {
    this.feat_update = this.MatchEvents.feat_update;
  }

  #defineEpicKills() {
    this.epic_kills = this.MatchEvents.epic_kills;
  }

  #defineChampionKills() {
    this.champion_kills = this.MatchEvents.champion_kills;
  }

  #defineChampSelect() {
    this.champion_select = this.MatchEvents.champion_select;
  }

  #defineBricks() {
    this.bricks = this.MatchEvents.bricks;
  }

  #defineDestroyedBuildings() {
    this.destroyed_buildings = this.MatchEvents.destroyed_buildings;
    console.log(this.destroyed_buildings);
  }
}

module.exports = MatchDetails;
