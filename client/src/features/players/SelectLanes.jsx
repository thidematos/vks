function SelectLanes({ puuid, state, onSelectLane }) {
  const lanes = ["top", "jungle", "mid", "adc", "supp"];

  return (
    <select
      className="row-span-1 font-vks text-lg text-slate-700"
      defaultValue={state}
      onChange={(e) => onSelectLane(puuid, e.target.value)}
    >
      {lanes.map((lane) => (
        <option key={lane} value={lane}>
          {lane}
        </option>
      ))}
    </select>
  );
}

export default SelectLanes;
