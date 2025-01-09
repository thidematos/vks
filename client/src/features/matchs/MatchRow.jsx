function MatchRow({ children }) {
  return <tr className="row-span-1 grid h-[60px] grid-cols-10">{children}</tr>;
}

function Name({ children }) {
  return <td className="markup col-span-3">{children}</td>;
}

function Teams({ children }) {
  return (
    <td className="col-span-2 flex flex-col items-center justify-center">
      <p className="font-vks text-xl text-purple-700 drop-shadow">{children}</p>
    </td>
  );
}

function Date({ children }) {
  return <td className="col-span-3">{children}</td>;
}

function Header() {
  const columns = [
    {
      name: "Teams",
      cols: "col-span-2",
    },
    {
      name: "Name",
      cols: "col-span-3",
    },
    {
      name: "Date",
      cols: "col-span-2",
    },
    {
      name: "Duration",
      cols: "col-span-2",
    },
    {
      name: "Winner",
      cols: "col-span-1",
    },
  ];

  return (
    <thead className="row-span-1">
      <tr className="grid w-full grid-cols-10">
        {columns.map((column) => (
          <th key={column.name} className={`markup ${column.cols}`}>
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

MatchRow.Name = Name;
MatchRow.Teams = Teams;
MatchRow.Date = Date;
MatchRow.Header = Header;

export default MatchRow;
