import { useParams } from "react-router-dom";
import useGetMatchs from "../../matchs/useGetMatchs";
import { useUI } from "../context/UIProvider";
import StatCard from "./StatCard";
import XP from "./stats/XP";
import KP from "./stats/KP";
import KDA from "./stats/KDA";

function StatsDetails() {
  const { isGraphicsExpanded } = useUI();
  const { matchID } = useParams();
  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch) return null;

  return (
    <div
      className={`${isGraphicsExpanded ? "collapse w-0 opacity-0" : "visible w-full opacity-100"} flex flex-row flex-wrap items-start justify-between gap-y-6 px-10 transition-all duration-500`}
    >
      {!isGraphicsExpanded && (
        <>
          <XP />
          <KP />
          <KDA />
        </>
      )}
    </div>
  );
}

export default StatsDetails;
