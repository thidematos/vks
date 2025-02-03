import { useParams } from "react-router-dom";
import useGetMatchs from "../matchs/useGetMatchs";
import { format } from "date-fns";

function Date() {
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch) return null;

  return (
    <div>
      <h2>
        <span>DATA: </span>{" "}
        <span>{format(currentMatch.gameSettings.timestamp, "dd/MM/yyyy")}</span>
      </h2>
    </div>
  );
}

export default Date;
