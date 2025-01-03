import { MatchDetailsProvider } from "../context/matchDetailsProvider";
import EventsRange from "../features/match_details/EventsRange";
import Header from "../features/match_details/Header";
import InGameStats from "../features/match_details/InGameStats";
import Map from "../features/match_details/Map";
import ParticipantsList from "../features/match_details/ParticipantsList";

function MatchDetails() {
  return (
    <MatchDetailsProvider>
      <main className="markup relative flex w-full grow flex-col items-center justify-center">
        <ParticipantsList />
        <div className="flex w-full flex-col items-center justify-center gap-2 px-10">
          <Header />
          <div className="flex w-full flex-row items-center justify-between gap-16">
            <InGameStats />
            <Map />
          </div>
        </div>
        <EventsRange />
      </main>
    </MatchDetailsProvider>
  );
}

export default MatchDetails;
