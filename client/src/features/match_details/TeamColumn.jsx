import { useParams } from "react-router-dom";
import useGetMatchs from "../matchs/useGetMatchs";
import Title from "../../ui/Title";
import PlayerAvatar from "../../ui/PlayerAvatar";

function TeamColumn({ side }) {
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch) return null;

  const isBlue = side === "blue";

  const team = currentMatch.participants[isBlue ? "teamOne" : "teamTwo"];

  console.log(team);
  console.log(currentMatch);

  return (
    <div
      className={`markup col-span-4 flex flex-col items-center justify-start gap-8`}
    >
      <Side isBlue={isBlue} />
      <Players team={team} />
    </div>
  );
}

function Side({ isBlue }) {
  const sideString = isBlue ? "Blue" : "Red";

  return (
    <h2
      className={`font-vks ${isBlue ? "text-blueTeam" : "text-redTeam"} text-2xl`}
    >
      {sideString}
    </h2>
  );
}

function Players({ team }) {
  const isBlue = team.teamNum === 100;

  return (
    <div
      className={`${isBlue ? "flex-row-reverse" : "flex-row"} flex w-full justify-evenly`}
    >
      {team.players.map((player, index) => (
        <PlayerAvatar
          summonerName={player.summonerName}
          key={player.puuid}
          isBlue={isBlue}
          championSplash={player.champion.splash}
        />
      ))}
    </div>
  );
}

export default TeamColumn;
