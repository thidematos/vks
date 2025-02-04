import Menu from "../features/match_details/components/Menu";
import TeamColumn from "../features/match_details/components/TeamColumn";
import { MatchDetailsProvider } from "../features/match_details/context/MatchDetailsProvider";
import Graphics from "../features/match_details/components/Graphics";
import StatsDetails from "../features/match_details/components/StatsDetails";
import { UIProvider } from "../features/match_details/context/UIProvider";

function MatchDetails() {
  return (
    <MatchDetailsProvider>
      <UIProvider>
        <main className="grid w-full grow grid-cols-10 content-start gap-6">
          <Menu />
          <div className="col-span-10 mb-2 grid grid-cols-10">
            <TeamColumn side={"blue"} />
            <TeamColumn side={"red"} />
          </div>
          <div className="col-span-10 flex flex-row">
            <StatsDetails />
            {/*<Graphics />*/}
          </div>
        </main>
      </UIProvider>
    </MatchDetailsProvider>
  );
}

export default MatchDetails;
