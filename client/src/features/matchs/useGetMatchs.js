import { useQuery } from "@tanstack/react-query";
import { getMatchsApi } from "../../services/matchApi";
import { useIsLoading } from "../../hooks/useIsLoading";

function useGetMatchs(matchID = null) {
  const {
    data: matchs,
    isPending: isGettingMatchs,
    error: errorMatchs,
  } = useQuery({
    queryKey: ["matchs"],
    queryFn: getMatchsApi,
  });

  useIsLoading(isGettingMatchs);

  const currentMatch =
    matchID !== null
      ? matchs?.filter((match) => match._id === matchID).at(0)
      : null;

  return { matchs, isGettingMatchs, errorMatchs, currentMatch };
}

export default useGetMatchs;
