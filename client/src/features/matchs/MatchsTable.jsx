import { format } from "date-fns";
import MatchRow from "./MatchRow";
import useGetMatchs from "./useGetMatchs";

function MatchsTable() {
  const { matchs } = useGetMatchs();

  if (!matchs) return null;

  console.log(matchs);

  return (
    <table className="grid w-[75%] grid-flow-row rounded border border-purple-300 shadow">
      <MatchRow.Header />
      <tbody className="markup row-span-1">
        {matchs.map((match) => (
          <MatchRow key={match._id} matchID={match._id}>
            <MatchRow.Teams>
              {match.participants.teamOne.team} vs{" "}
              {match.participants.teamTwo.team}
            </MatchRow.Teams>
            <MatchRow.Name>{match.gameSettings.name}</MatchRow.Name>
            <MatchRow.Date>
              {format(match.gameSettings.timestamp, "dd/MM/yyyy '---' HH:mm")}
            </MatchRow.Date>
          </MatchRow>
        ))}
      </tbody>
    </table>
  );
}

export default MatchsTable;
