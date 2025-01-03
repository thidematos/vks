import { useEffect } from "react";
import { useLoader } from "../context/LoaderProvider";

function useIsLoading(loadingState) {
  const { toggleLoader } = useLoader();

  useEffect(() => {
    if (loadingState) toggleLoader(true);
    else toggleLoader(false);
  }, [loadingState, toggleLoader]);

  return null;
}

export { useIsLoading };
