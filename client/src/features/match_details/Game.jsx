import { useQueries } from "@tanstack/react-query";
import useGetMatchs from "../matchs/useGetMatchs";
import { useParams } from "react-router-dom";

function Game() {
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch) return null;

  console.log(currentMatch);

  return (
    <div>
      <h2 className="font-vks">
        <span>GAME: </span> <span>{currentMatch.gameSettings.gameID}</span>
      </h2>
    </div>
  );
}

export default Game;
