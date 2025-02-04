import { AverageCalculator } from "../../utils/averageCalculator";

function ComparisonTable({ children }) {
  return (
    <div className="grid grid-cols-4 gap-y-2 text-center">
      <span className="col-span-4 font-bold uppercase">Comparison</span>
      {children}
    </div>
  );
}

function Header({ summonersNames }) {
  return (
    <Row isHeader={true}>
      <span className="col-span-1">Metrics</span>
      {summonersNames.map((player, ind) => (
        <span
          key={player}
          className={`col-span-1 ${ind === 0 ? "text-blueTeam" : "text-redTeam"} font-bold`}
        >
          {player}
        </span>
      ))}
      <span>Diff.</span>
    </Row>
  );
}

function DataRow({ metric, teamsData, isKP = false }) {
  return (
    <Row>
      <span className="col-span-1">{metric}</span>
      {teamsData.map((data) => (
        <span key={Math.random() * 1000} className="col-span-1">
          {data}
        </span>
      ))}
      <Diff
        teamOneTotal={teamsData.at(0)}
        teamTwoTotal={teamsData.at(1)}
        isKP={isKP}
      />
    </Row>
  );
}

function Diff({ teamOneTotal, teamTwoTotal, isKP }) {
  const diff = teamOneTotal - teamTwoTotal;

  let percentageDiff;

  if (isKP) {
    percentageDiff = (Math.abs(diff) * 100).toFixed(2);
  } else {
    percentageDiff = (
      (Math.abs(diff) /
        (teamOneTotal >= teamTwoTotal ? teamTwoTotal : teamOneTotal)) *
      100
    ).toFixed(2);
  }

  console.log(percentageDiff);

  return (
    <span
      className={`${
        diff > 0
          ? "text-blueTeam"
          : diff === 0
            ? "text-green-600"
            : "text-redTeam"
      } col-span-1 font-bold`}
    >{`${percentageDiff}%`}</span>
  );
}

function Row({ children, isHeader = false }) {
  return (
    <div
      className={`col-span-4 grid grid-cols-4 py-2 ${isHeader && "border-b border-slate-600"}`}
    >
      {children}
    </div>
  );
}

function TeamAverage({ teams, isKP = false, label }) {
  const [teamOne, teamTwo] = teams;

  const averages = new AverageCalculator(teamOne, teamTwo).getKPAverages();

  console.log(averages);

  return (
    <div className="col-span-1 flex flex-col">
      <span className="col-span-1 w-full text-center font-bold uppercase">
        Averages
      </span>
      {averages.map((average, ind, arr) => (
        <AverageBox
          label={label}
          isKP={isKP}
          average={average}
          key={average.time}
          isLast={ind === arr.length - 1}
        />
      ))}
    </div>
  );
}

function AverageBox({ average, isLast, isKP, label }) {
  return (
    <div
      className={`items-evenly flex flex-col gap-2 ${!isLast && "border-b border-b-slate-400"} py-2`}
    >
      <h2 className="w-full text-center">
        {label}@{average.time}
      </h2>
      <div className="flex flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
          <span className="font-vks font-bold text-blueTeam">BLUE</span>
          <span>{average.teamOneAverage}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-vks font-bold text-redTeam">RED</span>

          <span>{average.teamTwoAverage}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm">Avg. Diff</span>
          <Diff
            isKP={isKP}
            teamOneTotal={average.teamOneAverage}
            teamTwoTotal={average.teamTwoAverage}
          />
        </div>
      </div>
    </div>
  );
}

ComparisonTable.Header = Header;
ComparisonTable.DataRow = DataRow;
ComparisonTable.TeamAverage = TeamAverage;

export default ComparisonTable;
