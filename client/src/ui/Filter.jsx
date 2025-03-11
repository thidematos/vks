import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Filter() {
  return (
    <div>
      <button className="flex flex-row items-center justify-center gap-2 rounded border border-purple-400 bg-slate-100 p-2 shadow">
        <FontAwesomeIcon icon={faFilter} className="text-slate-500" />
        <span className="tracking-wider text-slate-500">Filters</span>
      </button>
    </div>
  );
}

export default Filter;
