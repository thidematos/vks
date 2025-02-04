class AverageCalculator {
  #times = [7, 15, 20];

  constructor(teamOne, teamTwo) {
    this.teamOne = teamOne;
    this.teamTwo = teamTwo;
  }

  #getSnapshot(team, time) {
    return team.find(
      (event) => Number(event.formattedTimestamp.split(":").at(0)) === time,
    ).players;
  }

  #calcAverage(snapshot) {
    return (
      snapshot.reduce((acc, item) => (acc += item.xp), 0) / snapshot.length
    );
  }

  #calcKPAverage(snapshot) {
    const totalKills = snapshot.reduce(
      (acc, player) => (acc += player.stats.championsKilled),
      0,
    );

    const playersKPS = snapshot
      .map((player) => {
        const curPlayerKills = player.stats.championsKilled;
        const curPlayerAssists = player.stats.assists;

        return curPlayerAssists + curPlayerKills;
      })
      .map((participation) =>
        totalKills > 0 ? participation / totalKills : 0,
      );

    return playersKPS.reduce((acc, kp) => (acc += kp), 0) / snapshot.length;
  }

  #buildCurAverage(time, isKP = false) {
    const teams = [this.teamOne, this.teamTwo];

    const [teamOneAverage, teamTwoAverage] = teams.map((team) => {
      const teamSnapshot = this.#getSnapshot(team, time);
      return isKP
        ? this.#calcKPAverage(teamSnapshot)
        : this.#calcAverage(teamSnapshot);
    });

    return { teamOneAverage, teamTwoAverage };
  }

  getKPAverages() {
    const averages = this.#times.map((time) => {
      const { teamOneAverage, teamTwoAverage } = this.#buildCurAverage(
        time,
        true,
      );

      return {
        time: time,
        teamOneAverage,
        teamTwoAverage,
      };
    });

    return averages;
  }

  getXPAverages() {
    const averages = this.#times.map((time) => {
      const { teamOneAverage, teamTwoAverage } = this.#buildCurAverage(time);

      return {
        time: time,
        teamOneAverage,
        teamTwoAverage,
      };
    });

    return averages;
  }
}

export { AverageCalculator };
