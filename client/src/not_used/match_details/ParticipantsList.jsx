import { useParams } from "react-router-dom";
import { useGetMatchs } from "./useGetMatchs";
import ParticipantIcon from "./ParticipantIcon";

function ParticipantsList() {
  const { matchs } = useGetMatchs();
  const { gameId } = useParams();

  if (!matchs) return null;

  const currentMatch = matchs.find((match) => match.gameId === Number(gameId));

  return (
    <nav className="centerX padSidebarSize fixed top-0 flex w-full flex-row items-center justify-center gap-6 py-6">
      {currentMatch.participants.map((participant) => (
        <ParticipantIcon participant={participant} key={participant._id} />
      ))}
    </nav>
  );
}

export default ParticipantsList;
