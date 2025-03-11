import { useQuery } from "@tanstack/react-query";
import { getMatchsApi } from "../services/matchApi";
import { useIsLoading } from "./useIsLoading";

function useGetMatchs() {
  const {
    data: matchs,
    error: matchsError,
    isLoading: isGettingMatchs,
  } = useQuery({
    queryKey: ["matchs"],
    queryFn: getMatchsApi,
  });

  useIsLoading(isGettingMatchs);

  return { matchs, matchsError };
}

export default useGetMatchs;
