import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { createMatchApi } from "../../services/matchApi";
import { useNavigate } from "react-router-dom";
import { useJsonUpload } from "../../context/JsonUploadProvider";
import { useEffect } from "react";
import { useLoader } from "../../context/LoaderProvider";
import { useIsLoading } from "../../hooks/useIsLoading";

function usePostMatch() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toggleLoader } = useLoader();

  const { mutate: createMatch, isPending: isCreatingMatch } = useMutation({
    mutationFn: (match) => createMatchApi(match),
    onSuccess: (data) => {
      console.log(data);
      toast.custom((t) => (
        <CustomToast t={t} type={"success"} text={"Process."} />
      ));

      queryClient.invalidateQueries(["matchs"]);

      navigate(
        `/match-details/${data.gameId}/${data.participants.at(0).puuid}`,
      );
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
