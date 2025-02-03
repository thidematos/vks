import Date from "../features/match_details/components/Date";
import Game from "../features/match_details/components/Game";
import Menu from "../features/match_details/components/Menu";
import Patch from "../features/match_details/components/Patch";
import TeamColumn from "../features/match_details/components/TeamColumn";
import { MatchDetailsProvider } from "../features/match_details/context/MatchDetailsProvider";

function MatchDetails() {
  return (
    <MatchDetailsProvider>
      <Menu />
      <main className="markup grid w-full grow grid-cols-10 pb-10">
        <TeamColumn side={"blue"} />
        <div className="col-span-2"></div>
        <TeamColumn side={"red"} />
      </main>
    </MatchDetailsProvider>
  );
}

export default MatchDetails;
