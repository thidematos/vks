import { useQuery } from "@tanstack/react-query";
import { getMatchsApi } from "../../services/matchApi";
import { useIsLoading } from "../../hooks/useIsLoading";

function useGetMatchs() {
  const {
    data: matchs,
    isPending: isGettingMatchs,
    error: errorMatchs,
  } = useQuery({
    queryKey: ["matchs"],
    queryFn: getMatchsApi,
  });

  useIsLoading(isGettingMatchs);

  return { matchs, isGettingMatchs, errorMatchs };
}

export default useGetMatchs;
