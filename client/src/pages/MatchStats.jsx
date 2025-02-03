import Date from "../features/match_details/Date";
import Game from "../features/match_details/Game";
import Patch from "../features/match_details/Patch";
import TeamColumn from "../features/match_details/TeamColumn";

function MatchStats() {
  return (
    <main className="markup grid w-full grow grid-cols-10 py-10">
      <TeamColumn side={"blue"} />
      <div className="markup col-span-2 flex w-full flex-col justify-start gap-10">
        <Game />
        <Date />
        <Patch />
      </div>
      <TeamColumn side={"red"} />
    </main>
  );
}

export default MatchStats;
