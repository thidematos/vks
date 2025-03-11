import Header from "./Header";

function Table({ children }) {
  return (
    <div className={`grid w-[65%] grid-cols-12`}>
      <Header />
      {children}
    </div>
  );
}

function Row({ children, isTitle = false }) {
  return (
    <div
      className={`col-span-12 grid grid-cols-8 ${isTitle ? "rounded bg-slate-300 text-slate-500" : "border-b border-b-slate-300"} px-6 py-4 shadow-sm`}
    >
      {children}
    </div>
  );
}

function Column({ cols, children }) {
  return (
    <div className={`${cols} flex flex-row items-center justify-start`}>
      <div className="w-full">{children}</div>
    </div>
  );
}

Table.Row = Row;
Table.Column = Column;

export default Table;
