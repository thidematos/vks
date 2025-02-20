import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { createMatchApi } from "../../services/matchApi";
import { useNavigate } from "react-router-dom";
import { useIsLoading } from "../../hooks/useIsLoading";

function useCreateMatch() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createMatch, isPending: isCreatingMatch } = useMutation({
    mutationFn: (formWithFiles) => createMatchApi(formWithFiles),
    onSuccess: (data) => {
      console.log(data);
      toast.custom((t) => (
        <CustomToast t={t} type={"success"} text={"Process."} />
      ));

      queryClient.invalidateQueries(["matchs"]);

      navigate(`/matchs`);
    },
    onError: (error) =>
      toast.custom((t) => (
        <CustomToast t={t} type={"error"} text={"Something went wrong, bro"} />
      )),
  });

  useIsLoading(isCreatingMatch);

  return { createMatch, isCreatingMatch };
}

export { useCreateMatch };
