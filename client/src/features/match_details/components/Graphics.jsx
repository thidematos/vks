import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMatchDetails } from "../context/MatchDetailsProvider";
import {
  faMagnifyingGlass,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useUI } from "../context/UIProvider";

function Graphics() {
  const { metrics, selectedMetric } = useMatchDetails();
  const { toggleExpandedGraphic, isGraphicsExpanded } = useUI();

  return (
    <div
      className={`relative ${isGraphicsExpanded ? "w-full" : "w-[30%]"} flex h-[450px] flex-col items-center justify-center border-y border-l border-slate-400 transition-all duration-500`}
    >
      {metrics[selectedMetric]}
      <button
        className={`absolute ${isGraphicsExpanded ? "left-0" : "left-[-4%]"} left-0 rounded bg-purple-400 p-2 shadow`}
        onClick={toggleExpandedGraphic}
      >
        <FontAwesomeIcon
          icon={
            isGraphicsExpanded ? faMagnifyingGlassMinus : faMagnifyingGlassPlus
          }
          className="text-slate-200"
        />
      </button>
    </div>
  );
}

export default Graphics;
