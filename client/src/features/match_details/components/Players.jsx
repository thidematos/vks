import PlayerAvatar from "../../../ui/PlayerAvatar";
import { useGetPlayers } from "../../players/useGetPlayers";
import { useMatchDetails } from "../context/MatchDetailsProvider";
import { useNewActivePlayer } from "../hooks/useNewActivePlayer";

function Players({ team }) {
  const isBlue = team.teamNum === 100;
  const { players } = useGetPlayers();
  const { teamOne, teamTwo, changeActivePlayer } = useMatchDetails();

  useNewActivePlayer(team);

  if (!players) return null;

  return (
    <div
      className={`${isBlue ? "flex-row-reverse" : "flex-row"} flex w-full justify-evenly`}
    >
      {team.players.map((curPlayer) => {
        const currentPlayer = players.find(
          (playerWithLane) => playerWithLane.puuid === curPlayer.puuid,
        );

        const isActivePlayer = isBlue
          ? teamOne.activePlayer === currentPlayer.puuid
          : teamTwo.activePlayer === currentPlayer.puuid;

        return (
          <PlayerAvatar
            onChangeActive={() =>
              changeActivePlayer(team.teamNum, currentPlayer.puuid)
            }
            isActive={isActivePlayer}
            key={currentPlayer.puuid}
            isBlue={isBlue}
            player={curPlayer}
            lane={currentPlayer.lane}
          />
        );
      })}
    </div>
  );
}

export default Players;
