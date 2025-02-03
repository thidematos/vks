import { PlayersProvider, usePlayers } from "../context/PlayersProvider";
import DefineLanes from "../features/players/DefineLanes";
import TableContainer from "../features/players/TableContainer";
import { useVerifyLanes } from "../features/players/useVerifyLanes";

function Players() {
  const { unlanedPlayers } = usePlayers();

  useVerifyLanes();

  return (
    <main
      id="players"
      className="markup flex w-full grow flex-col items-center justify-start gap-6"
    >
      <TableContainer />
    </main>
  );
}

export default Players;
