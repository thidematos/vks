import { useState } from "react";
import { usePlayers } from "../../context/PlayersProvider";
import SelectLanes from "./SelectLanes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button";
import { usePostLanes } from "./usePostLanes";
import { useIsLoading } from "../../hooks/useIsLoading";

function DefineLanes() {
  const { unlanedPlayers } = usePlayers();
  const [lanes, setLanes] = useState(() => {
    const obj = {};
    unlanedPlayers.forEach((player) => (obj[player.puuid] = "top"));
    return obj;
  });

  const { postLanes, isPostingLanes } = usePostLanes();

  useIsLoading(isPostingLanes);

  if (!unlanedPlayers.length === 0) return null;

  console.log(lanes);

  function selectLane(puuid, lane) {
    setLanes((state) => {
      return {
        ...state,
        [`${puuid}`]: lane,
      };
    });
  }

  return (
    <div className="table-scroll grid h-full grid-cols-2 overflow-y-auto p-6">
      <div className="col-span-2 flex flex-row items-center justify-between pb-8">
        <p className="font-vks text-2xl text-purple-700 drop-shadow-sm">
          Unlaned Players
        </p>
        <div className="flex flex-row items-center justify-center gap-3">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-red-700"
          />
          <p className="text-sm text-slate-500">
            Choose a lane for each new player in db
          </p>
        </div>
      </div>
      <div className="col-span-1 grid grid-flow-row gap-6">
        {unlanedPlayers.map((player) => (
          <p className="row-span-1" key={player._id}>
            {player.summonerName}
          </p>
        ))}
      </div>
      <div className="col-span-1 grid grid-flow-row gap-6">
        {unlanedPlayers.map((player) => (
          <SelectLanes
            key={player._id}
            puuid={player.puuid}
            onSelectLane={selectLane}
            state={lanes[player.puuid]}
          />
        ))}
      </div>
      <div className="col-span-2 flex flex-row items-center justify-center pt-12">
        <Button width={"w-[50%]"} onClick={() => postLanes(lanes)}>
          <p className="text-2xl">Submit</p>
        </Button>
      </div>
    </div>
  );
}

export default DefineLanes;
