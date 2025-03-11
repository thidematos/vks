import { useQuery } from "@tanstack/react-query";
import { getPlayersAPI } from "../services/playerApi";
import { useIsLoading } from "./../hooks/useIsLoading";

function useGetPlayers() {
  const {
    data: playersOnDb,
    error: errorPlayersOnDb,
    isPending: isGettingPlayersOnDb,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayersAPI,
  });

  useIsLoading(isGettingPlayersOnDb);

  return { playersOnDb, errorPlayersOnDb };
}

export { useGetPlayers };
