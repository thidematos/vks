export function getKPS(teams, criticalTimes) {
  const criticalTimesStr = ["at07", "at15", "at20"];

  const kps = teams.map((team) => {
    const teamStr = team.id === 100 ? "teamOne" : "teamTwo";

    const timeScreenshots = criticalTimesStr.map((time) => {
      const teamTotalKills = criticalTimes[time][teamStr].totals.championsKills;

      const curPlayer = criticalTimes[time][teamStr].teamParticipants.find(
        (player) => player.puuid === team.activePlayer,
      );

      const activePlayerParticipation =
        curPlayer.championsKilled + curPlayer.assists;

      const kp =
        teamTotalKills > 0 ? activePlayerParticipation / teamTotalKills : 0;

      return {
        [`${time}`]: kp.toFixed(2),
      };
    });
    return {
      [`${teamStr}`]: { kps: timeScreenshots, puuid: team.activePlayer },
    };
  });

  return kps;
}
