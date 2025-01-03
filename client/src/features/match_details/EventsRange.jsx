import { useEffect, useState } from "react";
import { useGetMatchs } from "./useGetMatchs";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useMatchDetails } from "../../context/matchDetailsProvider";

function EventsRange() {
  const { matchs } = useGetMatchs();
  const { gameId } = useParams();
  const { slider, changeTimestamp, setTimestampRange } = useMatchDetails();

  useEffect(() => {
    if (!slider.framesLength) {
      setTimestampRange(
        matchs
          ?.find((match) => match.gameId === Number(gameId))
          .participants.at(0).frames.length,
      );
    }
  }, [matchs, gameId, setTimestampRange, slider.framesLength]);

  if (!matchs) return null;

  const currentMatch = matchs.find((match) => match.gameId === Number(gameId));

  const currentFrame = currentMatch.participants
    .at(0)
    .frames.at(slider.actualRange ? slider.actualRange - 1 : 0);

  return (
    <div className="padSidebarSize centerX fixed bottom-0 flex w-[60%] flex-col items-center justify-center gap-3 pb-6">
      <h3 className="font-vks text-xl text-purple-800 drop-shadow">
        In Game Frame: {format(currentFrame.inGameTimestamp, "mm 'min'")}
      </h3>
      <div className="slidecontainer">
        <input
          type="range"
          min="1"
          max={slider.framesLength}
          value={slider.actualRange}
          onInput={(e) =>
            changeTimestamp({
              actualRange: e.target.value,
            })
          }
          className="slider"
        />
      </div>
    </div>
  );
}

export default EventsRange;
