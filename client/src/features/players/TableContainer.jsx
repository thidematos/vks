import { usePlayers } from "../../context/PlayersProvider";
import Table from "../../ui/Table";
import { useGetPlayers } from "./useGetPlayers";

function TableContainer() {
  const { players } = useGetPlayers();
  const { query } = usePlayers();

  if (!players) return null;

  const heightScreen = window.screen.height * 0.7;

  return (
    <div
      style={{ height: `${heightScreen}px` }}
      className="relative my-10 w-[65%] grow rounded border border-purple-300 bg-purple-50/50 shadow-xl"
    >
      <div className="flex h-[15%] flex-row items-center justify-between border-b border-slate-300 p-5">
        <Table.Label />
        <Table.Search />
      </div>
      <Table
        className={`table-scroll grid max-h-[85%] grid-flow-row overflow-y-scroll`}
      >
        <Table.Header>
          <tr className="grid w-full grid-cols-10">
            <Table.Column content={"Player"} cols={"col-span-3 "} />
            <Table.Column content={"Lane"} cols={"col-span-2 "} />
            <Table.Column content={"Nº Matchs"} cols={"col-span-2 "} />
            <Table.Column content={"Last Match"} cols={"col-span-3 "} />
          </tr>
        </Table.Header>
        <Table.Body cols={"row-span-1"}>
          {players
            .filter((player) =>
              player.summonerName.toLowerCase().includes(query),
            )
            .map((player) => (
              <Table.Row key={player._id} cols={" grid-cols-10"}>
                <Table.Column
                  cols={"col-span-3"}
                  content={player.summonerName}
                />
                <Table.Column cols={"col-span-3"} content={player.lane} />
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TableContainer;
