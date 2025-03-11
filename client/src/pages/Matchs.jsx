import { MatchsQueryProvider } from "../features/matchs/context/MatchsQueryProvider";
import MatchList from "../features/matchs/MatchList";

function Matchs() {
  return (
    <main className="markup flex w-full grow flex-col items-center justify-start py-16">
      <MatchsQueryProvider>
        <MatchList />
      </MatchsQueryProvider>
    </main>
  );
}

export default Matchs;
