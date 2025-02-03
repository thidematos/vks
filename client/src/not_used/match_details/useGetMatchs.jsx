import { useQuery } from "@tanstack/react-query";
import { getMatchsApi } from "../../services/matchApi";
import { useIsLoading } from "../../hooks/useIsLoading";

function useGetMatchs() {
  const {
    data: matchs,
    isPending: isGettingMatchs,
    error: getMatchsErrors,
  } = useQuery({
    queryKey: ["matchs"],
    queryFn: () => getMatchsApi(),
  });

  useIsLoading(isGettingMatchs);

  return { matchs, isGettingMatchs, getMatchsErrors };
}

export { useGetMatchs };
