class InGameFrame {
  inGameTimestamp;
  participantId;

  constructor(timestamp) {
    this.inGameTimestamp = timestamp;
  }

  defineStats(participantFrame) {
    this.participantId = participantFrame.participantId;
    this.stats = participantFrame;
  }
}

module.exports = InGameFrame;
