import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { createMatchApi } from "../../services/matchApi";
import { useNavigate } from "react-router-dom";
import { useIsLoading } from "../../hooks/useIsLoading";
import { useRemote } from "./../../context/RemoteProvider";

function usePostMatch() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setRemoteState } = useRemote();

  const { mutate: createMatch, isPending: isCreatingMatch } = useMutation({
    mutationFn: (match) => createMatchApi(match),
    onSuccess: (data) => {
      console.log(data);
      toast.custom((t) => (
        <CustomToast t={t} type={"success"} text={"Process."} />
      ));

      queryClient.invalidateQueries(["matchs"]);

      setRemoteState(data);

      navigate(`/match-details/${data.gameSettings.gameID}`);
    },
    onError: (error) =>
      toast.custom((t) => (
        <CustomToast t={t} type={"error"} text={"Something went wrong, bro"} />
      )),
  });

  useIsLoading(isCreatingMatch);

  return { createMatch, isCreatingMatch };
}

export { usePostMatch };
