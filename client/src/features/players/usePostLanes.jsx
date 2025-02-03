import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CustomToast from "../../ui/CustomToast";
import { postPlayersLanesAPI } from "../../services/playerApi";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalProvider";
import { useLoader } from "../../context/LoaderProvider";

function usePostLanes() {
  const queryClient = useQueryClient();
  const { toggleLoader } = useLoader();
  const { closeModal } = useModal();

  const { mutate: postLanes, isPending: isPostingLanes } = useMutation({
    mutationFn: (lanes) => postPlayersLanesAPI(lanes),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["players"]);

      toast.custom((t) => (
        <CustomToast
          t={t}
          type={"success"}
          text={"Calm down class. It's all good"}
        />
      ));

      closeModal();
      toggleLoader(false);
    },
    onError: (error) =>
      toast.custom((t) => (
        <CustomToast t={t} type={"error"} text={"Something went wrong, bro"} />
      )),
  });

  return { postLanes, isPostingLanes };
}

export { usePostLanes };
