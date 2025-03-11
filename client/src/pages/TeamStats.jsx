import { Outlet } from "react-router-dom";
import NavigationContainer from "../features/team-stats/NavigationContainer";
import { SelectedPlayersProvider } from "../features/team-stats/contexts/PlayersProvider";
import VerifiesPlayers from "../features/team-stats/VerifiesPlayers";
import Modal from "../ui/Modal";

function TeamStats() {
  return (
    <main className="markup flex w-full grow flex-col items-center justify-start py-16">
      <SelectedPlayersProvider>
        <NavigationContainer />
        <VerifiesPlayers>
          <Outlet />
        </VerifiesPlayers>
        <Modal />
      </SelectedPlayersProvider>
    </main>
  );
}

export default TeamStats;
