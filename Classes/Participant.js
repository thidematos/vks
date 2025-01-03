class Participant {
  constructor(participant) {
    this.participantId = participant.participantId;
    this.puuid = participant.puuid;
    this.frames = [];
  }

  defineFrames(frame) {
    this.frames.push(frame);
  }
}

module.exports = Participant;
