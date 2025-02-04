function StatCard({ label, children }) {
  return (
    <div className="relative flex h-[350px] flex-row gap-5 rounded bg-slate-300 p-6 shadow-lg">
      <h2 className="flex flex-col justify-center self-center font-vks text-3xl font-bold uppercase text-purple-700">
        {label.split("").map((char) => (
          <span key={Math.random() * 1000}>{char}</span>
        ))}
      </h2>
      <div className="col-span-5">{children}</div>
    </div>
  );
}

export default StatCard;
