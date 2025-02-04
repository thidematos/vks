import { useEffect, useRef, useState } from "react";
import { useGetPlayers } from "./useGetPlayers";
import { PlayersProvider, usePlayers } from "../../context/PlayersProvider";
import { useModal } from "../../context/ModalProvider";
import DefineLanes from "./DefineLanes";

function useVerifyLanes() {
  const { players } = useGetPlayers();
  const { defineUnlanedPlayers } = usePlayers();
  const { openModal } = useModal();

  useEffect(() => {
    if (!players) return;

    const unlanedPlayers = players.filter((player) => player.lane === null);

    if (unlanedPlayers.length === 0) return;

    defineUnlanedPlayers(unlanedPlayers);

    openModal({
      component: <DefineLanes />,
      canClose: false,
    });
  }, [players, defineUnlanedPlayers, openModal]);
}

export { useVerifyLanes };
