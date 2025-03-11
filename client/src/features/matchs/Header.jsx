import Filter from "../../ui/Filter";
import Search from "../../ui/Search";
import Title from "../../ui/Title";
import { useMatchsQuery } from "./context/MatchsQueryProvider";

function Header() {
  const { query, setQuery } = useMatchsQuery();

  return (
    <div className="col-span-12 flex flex-row items-center justify-between py-4">
      <Title>MATCHES</Title>
      <div className="flex flex-row justify-center gap-6">
        <Search state={query} setState={setQuery} />
        <Filter />
      </div>
    </div>
  );
}

export default Header;
