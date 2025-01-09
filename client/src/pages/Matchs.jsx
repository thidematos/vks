import MatchsTable from "../features/matchs/MatchsTable";
import Title from "../ui/Title";

function Matchs() {
  return (
    <main className="markup flex w-full grow flex-col items-center justify-start gap-6 py-10">
      <Title variation="main" text={"Matchs"} />
      <MatchsTable />
    </main>
  );
}

export default Matchs;
