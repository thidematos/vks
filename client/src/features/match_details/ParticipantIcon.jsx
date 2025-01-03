import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function ParticipantIcon({ participant }) {
  const [isHovered, setIsHovered] = useState(false);

  const { gameId } = useParams();

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center gap-1`}
      >
        <NavLink
          to={`/match-details/${gameId}/${participant.puuid}`}
          className={`flex size-[60px] flex-col items-center justify-center rounded-full shadow-lg transition-transform ${isHovered ? "scale-110 bg-purple-600" : "scale-100 bg-purple-700"} transition-colors`}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            icon={faUserSecret}
            className="text-3xl text-slate-200"
          />
        </NavLink>
        <p className="text-sm">{participant.participantId}</p>
        {/*  <div
          className={`${isHovered ? "absolute" : "hidden"} left-[120%] top-[-5%] rounded-lg bg-purple-600/50 p-4 shadow`}
        >
          <p className="w-[200px] text-[10px]">
            Player PUUID: {participant.puuid}
          </p>
        </div>
        */}
      </div>
    </>
  );
}

export default ParticipantIcon;
