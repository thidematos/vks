import { useParams } from "react-router-dom";
import { useGetMatchs } from "../features/match_details/useGetMatchs";
import { useMatchDetails } from "../context/matchDetailsProvider";

function useGetParticipantStats() {
  const { gameId, puuid } = useParams();
  const { matchs } = useGetMatchs();
  const { slider } = useMatchDetails();

  const currentParticipant = matchs
    ?.find((match) => match.gameId === Number(gameId))
    .participants.find((participant) => participant.puuid === puuid);

  const currentFrame =
    currentParticipant?.frames[
      slider.actualRange === 0 ? 0 : slider.actualRange - 1
    ];

  return { currentFrame };
}

export { useGetParticipantStats };
