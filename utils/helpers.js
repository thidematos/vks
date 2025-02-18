const { format } = require('date-fns');

exports.extractData = (participant) => {
  const stats = {
    minions_killed: 0,
    neutral_minions_killed: 0,
    neutral_minions_killed_your_jungle: 0,
    neutral_minions_killed_enemy_jungle: 0,
    champions_killed: 0,
    num_deaths: 0,
    assists: 0,
    ward_placed: 0,
    ward_killed: 0,
    vision_score: 0,
    physical_damage_dealt_to_champions: 0,
    magic_damage_dealt_to_champions: 0,
    true_damage_dealt_to_champions: 0,
    total_damage_dealt_to_champions: 0,
  };

  for (let ind = 0; ind < participant.stats.length; ind++) {
    switch (participant.stats[ind].name) {
      case 'MINIONS_KILLED':
        stats.minions_killed = participant.stats[ind].value;
        break;

      case 'NEUTRAL_MINIONS_KILLED':
        stats.neutral_minions_killed = participant.stats[ind].value;
        break;

      case 'NEUTRAL_MINIONS_KILLED_YOUR_JUNGLE':
        stats.neutral_minions_killed_your_jungle = participant.stats[ind].value;
        break;

      case 'NEUTRAL_MINIONS_KILLED_ENEMY_JUNGLE':
        stats.neutral_minions_killed_enemy_jungle =
          participant.stats[ind].value;
        break;

      case 'CHAMPIONS_KILLED':
        stats.champions_killed = participant.stats[ind].value;
        break;

      case 'NUM_DEATHS':
        stats.num_deaths = participant.stats[ind].value;
        break;

      case 'ASSISTS':
        stats.assists = participant.stats[ind].value;
        break;

      case 'WARD_PLACED':
        stats.ward_placed = participant.stats[ind].value;
        break;

      case 'WARD_KILLED':
        stats.ward_killed = participant.stats[ind].value;
        break;

      case 'VISION_SCORE':
        stats.vision_score = participant.stats[ind].value;
        break;

      case 'TOTAL_DAMAGE_DEALT_TO_CHAMPIONS':
        stats.total_damage_dealt_to_champions = participant.stats[ind].value;
        break;

      case 'PHYSICAL_DAMAGE_DEALT_TO_CHAMPIONS':
        stats.physical_damage_dealt_to_champions = participant.stats[ind].value;
        break;

      case 'MAGIC_DAMAGE_DEALT_TO_CHAMPIONS':
        stats.magic_damage_dealt_to_champions = participant.stats[ind].value;
        break;

      case 'TRUE_DAMAGE_DEALT_TO_CHAMPIONS':
        stats.true_damage_dealt_to_champions = participant.stats[ind].value;
        break;

      default:
        continue;
    }
  }

  return {
    puuid: participant.puuid,
    xp: participant.XP,
    level: participant.level,
    participantID: participant.participantID,
    position: participant.position,
    gold: participant.totalGold,
    stats: stats,
  };
};

exports.formatTimestamp = (timestamp) => format(timestamp, 'mm:ss');
