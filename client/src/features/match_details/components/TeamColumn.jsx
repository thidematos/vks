import { useParams } from "react-router-dom";
import useGetMatchs from "../../matchs/useGetMatchs";

import { useVerifyLanes } from "../../players/useVerifyLanes";
import { useGetPlayers } from "../../players/useGetPlayers";

import Players from "./Players";

function TeamColumn({ side }) {
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);
  const { players } = useGetPlayers();

  useVerifyLanes();

  if (!currentMatch) return null;
  if (!players) return null;

  const isBlue = side === "blue";

  const team = currentMatch.participants[isBlue ? "teamOne" : "teamTwo"];

  return (
    <div
      className={`col-span-5 ${isBlue ? "flex-row" : "flex-row-reverse"} flex items-center justify-start gap-8 px-10`}
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

export default TeamColumn;
