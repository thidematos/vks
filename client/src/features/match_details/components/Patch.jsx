import { useParams } from "react-router-dom";
import useGetMatchs from "../../matchs/useGetMatchs";

function Patch() {
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch) return null;

  return (
    <div>
      <h2>
        <span>PATCH:</span>
        <span>{currentMatch.gameSettings.patch}</span>
      </h2>
    </div>
  );
}

export default Patch;
