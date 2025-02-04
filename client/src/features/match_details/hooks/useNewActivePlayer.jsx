import { useEffect } from "react";
import { useMatchDetails } from "../context/MatchDetailsProvider";

export function useNewActivePlayer(team) {
  const { teamOne, teamTwo, changeActivePlayer } = useMatchDetails();

  useEffect(() => {
    if (teamOne.activePlayer !== null && teamTwo.activePlayer !== null) return;

    changeActivePlayer(team.teamNum, team.players.at(0).puuid);
  }, [
    teamOne.activePlayer,
    team.teamNum,
    changeActivePlayer,
    team.players,
    teamTwo.activePlayer,
  ]);
}
