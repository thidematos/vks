import { useState } from "react";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { useGetPlayers } from "./../../hooks/useGetPlayers";
import LaneIcon from "../../ui/LaneIcon";
import { useSelectedPlayers } from "./contexts/PlayersProvider";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import CustomToast from "./../../ui/CustomToast";

function PlayerSelection() {
  const { playersOnDb } = useGetPlayers();
  const { players, saveSelectedPlayers } = useSelectedPlayers();

  const isMissingOnBuffer = Object.values(players.selectedBuffer).some(
    (lane) => lane === null,
  );

  if (!playersOnDb) return null;

  return (
    <div className="flex h-full flex-col justify-start gap-8 p-16">
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-montserrat text-xl text-slate-700">
          Select team for reference
        </h2>
        <LanesOnBuffer />
      </div>
      <div className="grid h-full grid-cols-5 gap-4 overflow-y-auto">
        <RoleColumn lane={"top"} />
        <RoleColumn lane={"jungle"} />
        <RoleColumn lane={"mid"} />
        <RoleColumn lane={"adc"} />
        <RoleColumn lane={"supp"} />
      </div>
      <div className="flex flex-row justify-center">
        {isMissingOnBuffer && (
          <p className="w-[30%] cursor-not-allowed rounded border border-slate-200 bg-red-800 px-4 py-2 text-center font-vks text-xl text-slate-100 shadow-lg">
            Lanes still missing!
          </p>
        )}
        {!isMissingOnBuffer && (
          <Button width={"w-[30%]"} onClick={saveSelectedPlayers}>
            <span className="text-xl">Save Team</span>
          </Button>
        )}
      </div>
    </div>
  );
}

function RoleColumn({ lane }) {
  const { playersOnDb } = useGetPlayers();

  const rolePlayers = playersOnDb.filter((player) => player.lane === lane);

  return (
    <div className="col-span-1 h-min border border-slate-300">
      <p className="py-2 text-center font-vks text-2xl text-purple-700">
        {capitalizeFirstLetter(lane)}
      </p>
      {rolePlayers.map((player) => (
        <PlayerRow player={player} lane={lane} key={player.puuid} />
      ))}
    </div>
  );
}

function PlayerRow({ player, lane }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectLanePlayer, unselectLanePlayer, players } =
    useSelectedPlayers();

  const isCurrentSelected = players.selectedBuffer[lane] === player.puuid;

  return (
    <div
      className={`cursor-pointer border-y border-y-slate-300 py-6 pl-4 font-montserrat shadow transition-colors ${isHovered && !isCurrentSelected && "bg-purple-500/75 text-slate-50"} ${isCurrentSelected && "bg-purple-600 text-slate-50"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        isCurrentSelected
          ? unselectLanePlayer({ [`${lane}`]: null })
          : selectLanePlayer({ [`${lane}`]: player.puuid })
      }
    >
      <p className={``}>
        {player.summonerName.split(" ").at(1) || player.summonerName}
      </p>
    </div>
  );
}

function LanesOnBuffer() {
  const { players } = useSelectedPlayers();

  return (
    <div className="flex flex-row items-center justify-center gap-8">
      <div className={`${players.selectedBuffer.top === null && "grayscale"}`}>
        <LaneIcon lane={"top"} />
      </div>
      <div
        className={`${players.selectedBuffer.jungle === null && "grayscale"}`}
      >
        <LaneIcon lane={"jungle"} />
      </div>
      <div className={`${players.selectedBuffer.mid === null && "grayscale"}`}>
        <LaneIcon lane={"mid"} />
      </div>
      <div className={`${players.selectedBuffer.adc === null && "grayscale"}`}>
        <LaneIcon lane={"adc"} />
      </div>
      <div className={`${players.selectedBuffer.supp === null && "grayscale"}`}>
        <LaneIcon lane={"supp"} />
      </div>
    </div>
  );
}

export default PlayerSelection;
