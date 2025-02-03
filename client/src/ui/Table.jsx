import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { usePlayers } from "../context/PlayersProvider";

function Table({ className, children }) {
  return <table className={className}>{children}</table>;
}

function Body({ cols, children }) {
  return (
    <tbody className={`row-span-1 grid ${cols} tracking-wide text-slate-500`}>
      {children}
    </tbody>
  );
}

function Header({ children }) {
  return (
    <thead className={`row-span-1 py-4 tracking-wide text-slate-500`}>
      {children}
    </thead>
  );
}

function Row({ children, cols }) {
  return <tr className={`grid w-full py-4 ${cols}`}>{children}</tr>;
}

function Column({ isHeadColumn = false, content, cols }) {
  const className = `text-start drop-shadow-sm px-6 font-normal  ${cols}`;

  if (isHeadColumn) return <th className={className}>{content}</th>;

  return <td className={className}>{content}</td>;
}

function Label() {
  return <Title text={"Known Players"} variation="secondary" />;
}

function Search() {
  const { query, changeQuery } = usePlayers();

  return (
    <div className="relative w-[40%]">
      <FontAwesomeIcon
        icon={faSearch}
        className="centerY absolute left-2 text-slate-500"
      />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          changeQuery(e.target.value);
        }}
        className="w-full rounded border border-purple-300 bg-slate-50 p-2 pl-8 text-sm text-slate-500 shadow-sm outline-none"
      />
    </div>
  );
}

Table.Body = Body;
Table.Header = Header;
Table.Label = Label;
Table.Search = Search;
Table.Row = Row;
Table.Column = Column;

export default Table;
