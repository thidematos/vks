const mongoose = require('mongoose');

const matchScheema = new mongoose.Schema({
  gameId: Number,
  timestamp: Date,
  participants: [
    {
      participantId: Number,
      puuid: String,
      frames: [
        {
          inGameTimestamp: Number,
          participantId: Number,
          stats: {
            championStats: {
              abilityHaste: Number,
              abilityPower: Number,
              armor: Number,
              armorPen: Number,
              armorPenPercent: Number,
              attackDamage: Number,
              attackSpeed: Number,
              bonusArmorPenPercent: Number,
              bonusMagicPenPercent: Number,
              ccReduction: Number,
              cooldownReduction: Number,
              health: Number,
              healthMax: Number,
              healthRegen: Number,
              lifesteal: Number,
              magicPen: Number,
              magicPenPercent: Number,
              magicResist: Number,
              movementSpeed: Number,
              omnivamp: Number,
              physicalVamp: Number,
              power: Number,
              powerMax: Number,
              powerRegen: Number,
              spellVamp: Number,
            },
            currentGold: Number,
            damageStats: {
              magicDamageDone: Number,
              magicDamageDoneToChampions: Number,
              magicDamageTaken: Number,
              physicalDamageDone: Number,
              physicalDamageDoneToChampions: Number,
              physicalDamageTaken: Number,
              totalDamageDone: Number,
              totalDamageDoneToChampions: Number,
              totalDamageTaken: Number,
              trueDamageDone: Number,
              trueDamageDoneToChampions: Number,
              trueDamageTaken: Number,
            },
            goldPerSecond: Number,
            jungleMinionsKilled: Number,
            level: Number,
            minionsKilled: Number,
            position: {
              x: Number,
              y: Number,
            },
            timeEnemySpentControlled: Number,
            totalGold: Number,
            xp: Number,
          },
        },
      ],
    },
  ],
});

const Match = mongoose.model('Match', matchScheema);

module.exports = Match;
