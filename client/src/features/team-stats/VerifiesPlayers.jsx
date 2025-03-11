import { useEffect } from "react";
import { useSelectedPlayers } from "./contexts/PlayersProvider";
import { useModal } from "../../context/ModalProvider";
import PlayerSelection from "./PlayerSelection";

function VerifiesPlayers({ children }) {
  const { players } = useSelectedPlayers();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    console.log(players);

    const isMissingPlayer = Object.values(players.selectedPlayers).some(
      (playerUid) => playerUid === null,
    );

    if (isMissingPlayer)
      openModal({
        canClose: false,
        component: <PlayerSelection />,
      });

    if (!isMissingPlayer) closeModal();
  }, [openModal, players, closeModal]);

  return children;
}

export default VerifiesPlayers;
