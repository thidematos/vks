import { useParams } from "react-router-dom";
import { useGetMatchs } from "./useGetMatchs";
import { format } from "date-fns";

function Header() {
  const { gameId } = useParams();
  const { matchs } = useGetMatchs();

  if (!matchs) return null;

  const currentMatch = matchs.find((match) => match.gameId === Number(gameId));

  return (
    <div className="flex w-full flex-row items-center justify-center gap-24 font-vks text-2xl text-purple-900">
      <h2>Match {gameId}</h2>
      <h3>{format(currentMatch.timestamp, "dd/MM/yyyy - HH:mm")}</h3>
    </div>
  );
}

export default Header;
