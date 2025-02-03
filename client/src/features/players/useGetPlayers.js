import { useQuery } from "@tanstack/react-query";
import { getPlayersAPI } from "../../services/playerApi";
import { useIsLoading } from "../../hooks/useIsLoading";

function useGetPlayers() {
  const {
    data: players,
    isPending: isGettingPlayers,
    error: errorPlayers,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayersAPI,
  });

  useIsLoading(isGettingPlayers);

  return { players, isGettingPlayers, errorPlayers };
}

export { useGetPlayers };
