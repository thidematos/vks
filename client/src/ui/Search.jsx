import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search({ state, setState }) {
  return (
    <div className="relative">
      {!state && (
        <FontAwesomeIcon
          icon={faSearch}
          className="centerY absolute left-2 text-lg text-slate-400"
        />
      )}

      <input
        type="text"
        value={state}
        onChange={(event) => setState(event.target.value)}
        style={{ paddingLeft: !state && "2rem" }}
        className="w-[250px] rounded border border-purple-400 bg-slate-100 p-2 font-montserrat shadow outline-none placeholder:text-xs placeholder:italic placeholder:text-slate-400"
        placeholder="Match ID, player..."
      />
    </div>
  );
}

export default Search;
